+++
title = "TwoPunctures"
description = "TwoPunctures에 대해 다룹니다."
icon = "code"
draft = false
toc = true
weight = 210
+++

## 개요

`TwoPunctures`는 블랙홀 쌍성 초기 데이터를 구성할 때 많이 쓰이는 thorn입니다. Single domain spectral method를 사용합니다. [Phys. Rev. D 70, 064011 (2004)](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.70.064011)

두 개의 블랙홀에 대해서만 사용할 수 있지만, 하나의 질량을 $0$으로 설정하여 하나의 블랙홀에 대해서도 사용할 수 있습니다.

## 구조
### 블랙홀의 위치
핵심적인 파라미터는 `par_b`, `par_m_plus`, `par_m_minus`, `par_P_plus[3]`, `par_P_minus[3]`, `par_S_plus[3]`, `par_S_minus[3]`, `center_offset[3]`입니다.

원본 문서에서 제시하는 파라미터의 설명 중 `par_b`, `center_offset[3]`은 설명이 명확하지 않습니다. 각각을 $b$, $c_x$, $c_y$, $c_z$라 할 때, 정확히 이들은 다음과 같이 구성됩니다.
두 블랙홀은 오직 $x$축 상에서 $2b$ 만큼 떨어져 있습니다. 두 블랙홀의 $y$좌표와 $z$좌표는 서로 같아야 합니다. 이제 두 블랙홀의 최종 위치는 다음과 같습니다.
- $m_+ : (c_x + b, c_y, c_z)$,
- $m_- : (c_x - b, c_y, c_z)$.

따라서 `center_offset[3]`은 일반적으로 질량 중심으로 설정합니다.

### 좌표
다음과 같은 $(A, B, \phi)$ 좌표계를 사용합니다:
$$
A \in [0, 1], \quad B \in [-1, 1], \quad \phi \in [0, 2\pi).
$$
$A$, $r$은 다음과 같이 연결됩니다:
$$
r \to \infty \Longleftrightarrow A \to 1.
$$

### 데이터 타입
#### derivs
- `derivs`는 다음과 같이 정의됩니다. 각각에 대한 미분값을 저장하는 것으로 추정됩니다.
```c
typedef struct DERIVS
{
  CCTK_REAL *d0, *d1, *d2, *d3, *d11, *d12, *d13, *d22, *d23, *d33;
} derivs;
```

## 파라미터

### ADMBase 확장
- `ADMBase::initial_data`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `twopunctures` | `KEYWORD` | Initial data로 TwoPunctures를 사용합니다. |
{{< /table >}}

- `ADMBase::initial_lapse`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `"twopunctures-antisymmetric"` | `KEYWORD` | antisymmetric lapse for two puncture black holes, ($-1 \le \alpha \le 1$) |
| `"twopunctures-averaged"` | `KEYWORD` | 두 puncture의 평균을 사용합니다. ($0 \le \alpha \le 1$)|
| `"psi^n"` | `KEYWORD` | 초기 conformal factor에 기반합니다. $n<0$의 값은 `initial_lapse_psi_exponent`을 통해 설정할 수 있습니다.|
| `"brownsville"` | `KEYWORD` | [Phys. Rev. D 74, 041501 (2006)](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.74.041501) |
{{< /table >}}

### TwoPunctures

- `TwoPunctures::verbose` : Thorn 작동에 대한 구체적인 정보를 출력할 지 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` | 구체적인 정보를 출력합니다. |
| `no` (기본값)| `BOOLEAN` | 구체적인 정보를 출력하지 않습니다. |
{{< /table >}}

- `TwoPunctures::keep_u_around` : Keep the variable u around after solving
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` |  |
| `no` (기본값)| `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::give_bare_mass` : ADM 질량 `target_M_plus`, `target_M_minus` 대신 bare 질량 `par_m_plus`, `par_m_minus`을 사용할 지를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` (기본값) | `BOOLEAN` | bare mass를 사용합니다. |
| `no` | `BOOLEAN` | ADM mass를 사용합니다. 주어진 허용 오차 `adm_tol` 이내로 `target_M_*`에 맞는 `par_m_*`을 찾는 과정이 진행됩니다. |
{{< /table >}}

- `TwoPunctures::adm_tol` : `give_bare_mass`가 `no`인 경우 ADM mass에 대한 허용 오차 $\left|M_\mathrm{target} - M_\mathrm{ADM}\right|$를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1.0e-10` (기본값) | `REAL` | 허용 오차가 이 값이 될 때까지 bare 질량을 변화시켜가며 ADM 질량을 구하는 것을 반복합니다. 값은 $0$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::grid_setup_method` : Spectral grid로부터 3D grid를 어떻게 채울 것인지 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `"Taylor expansion"` (기본값) | `KEYWORD` | 가장 가까운 collocation 점에 대한 테일러 전개를 사용합니다. 빠르지만 부정확할 수 있습니다. |
| `"evaluation"` | `KEYWORD` | 모든 spectral 계수를 사용합니다. 느립니다. |
{{< /table >}}

- `TwoPunctures::npoints_A` : Compatified 반지름 방향에서 계수의 개수를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `30` (기본값) | `INT` | 값은 $4$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::npoints_B` : $\theta$ 방향에서 계수의 개수를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `30` (기본값) | `INT` | 값은 $4$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::npoints_C` : $\phi$ 방향에서 계수의 개수를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `16` (기본값) | `INT` | 값은 $4$ 이상의 짝수이어야 합니다.|
{{< /table >}}

- `TwoPunctures::Newton_tol` : Newton solver의 허용치를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1.0e-10` (기본값) | `REAL` | 값은 $0$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::Newton_maxit` : Newton iteration의 최대 횟수를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `5` (기본값) | `INT` | 값은 $0$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::TP_epsilon` : Puncture가 있는 곳에서의 특이점을 완화하기 위한 작은 수를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.0` (기본값) | `REAL` | 값은 $0$ 이상의 작은 수이어야 합니다.|
{{< /table >}}

- `TwoPunctures::TP_Tiny` : Puncture와 그 근처에서의 `nan`을 피하기 위한 작은 수를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.0` (기본값) | `REAL` | 값은 $0$ 이상의 작은 수이어야 합니다.|
{{< /table >}}

- `TwoPunctures::TP_Extend_Radius` : Puncture 대신 확장된 시공간의 반지름을 결정합니다. (Radius of an extended spacetime instead of the puncture)
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.0` (기본값) | `REAL` | 값은 $0$ 이상이여야 하고 horizon보다 작을 것입니다.|
{{< /table >}}

- `TwoPunctures::par_b` : $m_+$ puncture의 $x$ 좌표를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1.0` (기본값) | `REAL` | 값은 $0$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::par_m_plus` : $m_+$ puncture의 질량을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1.0` (기본값) | `REAL` | 값은 $0$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::par_m_plus` : $m_-$ puncture의 질량을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1.0` (기본값) | `REAL` | 값은 $0$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::target_M_plus` : 목표하는 ADM 질량 $M_+$을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.5` (기본값) | `REAL` | 값은 $0$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::target_M_minus` : 목표하는 ADM 질량 $M_-$을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.5` (기본값) | `REAL` | 값은 $0$ 이상이어야 합니다.|
{{< /table >}}

- `TwoPunctures::par_P_plus[3]` : $m_+$ puncture의 momentum을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.0` (기본값) | `REAL` | |
{{< /table >}}

- `TwoPunctures::par_P_minus[3]` : $m_-$ puncture의 momentum을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.0` (기본값) | `REAL` | |
{{< /table >}}

- `TwoPunctures::par_S_plus[3]` : $m_+$ puncture의 spin을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.0` (기본값) | `REAL` | |
{{< /table >}}

- `TwoPunctures::par_S_minus[3]` : $m_-$ puncture의 spin을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.0` (기본값) | `REAL` | |
{{< /table >}}

- `TwoPunctures::center_offset[3]` : $b=0$에 대한 기준 좌표를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0.0` (기본값) | `REAL` | |
{{< /table >}}

- `TwoPunctures::initial_lapse_psi_exponent` : 초기 lapse 설정에서 $\psi^{n}$의 $n$을 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `-2.0` (기본값) | `REAL` | 값은 모든 실수일 수 있지만, 일반적으로 음수일 것입니다. |
{{< /table >}}

- `TwoPunctures::swap_xz` : Interpolating에서 $x$, $z$ 좌표를 바꿈으로써 블랙홀이 $z$ 방향에서 분리되게 합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` |  |
| `no` (기본값) | `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::use_sources` : Use sources?
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` |  |
| `no` (기본값) | `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::rescale_sources` : If sources are used - rescale them after solving?
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` (기본값) | `BOOLEAN` |  |
| `no`  | `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::use_external_initial_guess` : Set initial guess by external function?
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` |  |
| `no` (기본값) | `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::do_residuum_debug_output` : Output debug information about the residuum
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` |  |
| `no` (기본값) | `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::do_initial_debug_output` : Output debug information about initial guess
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` |  |
| `no` (기본값) | `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::multiply_old_lapse` : Multiply the old lapse with the new one
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` |  |
| `no` (기본값) | `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::schedule_in_ADMBase_InitialData` : Schedule in (instead of after) ADMBase_InitialData
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` (기본값)| `BOOLEAN` |  |
| `no`  | `BOOLEAN` |  |
{{< /table >}}

- `TwoPunctures::solve_momentum_constraint` : Solve for momentum constraint?
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `yes` | `BOOLEAN` |  |
| `no` (기본값) | `BOOLEAN` |  |
{{< /table >}}

