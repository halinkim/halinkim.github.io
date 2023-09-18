+++
title = "ML_BSSN"
description = "ML_BSSN에 대해 다룹니다."
icon = "code"
draft = false
toc = true
weight = 210
+++

## 개요

`ML_BSSN`은 Einstein Toolkit의 대표적인 thorn 중 하나로 BSSN formulation을 이용하여 시공간을 evolution합니다.

## 파라미터

### ADMBase 확장
- `ADMBase::evolution_method`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `ML_BSSN` | `CCTK_KEYWORD` | evolution method로 ML_BSSN을 사용합니다. |
{{< /table >}}

- `ADMBase::lapse_evolution_method`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `ML_BSSN` | `CCTK_KEYWORD` | lapse evolution method로 ML_BSSN을 사용합니다. |
{{< /table >}}

- `ADMBase::shift_evolution_method`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `ML_BSSN` | `CCTK_KEYWORD` | shift evolution method로 ML_BSSN을 사용합니다. |
{{< /table >}}

- `ADMBase::dtlapse_evolution_method`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `ML_BSSN` | `CCTK_KEYWORD` | dtlapse evolution method로 ML_BSSN을 사용합니다. |
{{< /table >}}

- `ADMBase::dtshift_evolution_method`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `ML_BSSN` | `CCTK_KEYWORD` | dtshift evolution method로 ML_BSSN을 사용합니다. |
{{< /table >}}




### GenericFD 공유

{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `assume_stress_energy_state` | `CCTK_INT` |  |
| `assume_use_jacobian` | `CCTK_INT` |  |
| `jacobian_group` | `CCTK_STRING` |  |
| `jacobian_determinant_group` | `CCTK_STRING` |  |
| `jacobian_inverse_group` | `CCTK_STRING` |  |
| `jacobian_derivative_group` | `CCTK_STRING` |  |
| `jacobian_identity_map` | `CCTK_STRING` |  |
{{< /table >}}

### MethodOfLines 공유

{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `MoL_Num_Evolved_Vars` | `CCTK_INT` |  |
| `MoL_Num_ArrayEvolved_Vars` | `CCTK_INT` |  |
{{< /table >}}



### ML_BSSN

- `ML_BSSN::verbose` : Thorn 작동에 대한 구체적인 정보를 출력할 지 결정합니다. `STEERABLE=ALWAYS`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0` (기본값) | `CCTK_INT` | 구체적인 정보를 출력하지 않습니다. |
{{< /table >}}

- `ML_BSSN::other_timelevels` : non-evolved grid functions에 대해 활성화된 timelevel의 수를 결정합니다. `STEERABLE=RECOVER`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1` (기본값) | `CCTK_INT` | 값은 $0$ 이상 $4$ 이하이어야 합니다. |
{{< /table >}}

- `ML_BSSN::harmonicF` : $\partial_t \alpha = -f\alpha^n K$에서 $f$의 값을 결정합니다. $f=1$이면 harmonic, $f=2$이면 1+log slicing에 해당합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1` (기본값) | `CCTK_REAL` |  |
{{< /table >}}

- `ML_BSSN::alphaDriver` : $\partial_t \alpha = \cdots - \mathrm{(alphaDriver)}(\alpha - 1)$에서 alphaDriver의 값을 결정합니다. (use 1/M (?))
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0` (기본값) | `CCTK_REAL` |  |
{{< /table >}}

- `ML_BSSN::shiftGammaCoeff` : $\partial_t \beta^i = C Xt^i$ (use C=0.75/M)
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0` (기본값) | `CCTK_REAL` |  |
{{< /table >}}

- `ML_BSSN::betaDriver` : $\partial_t \beta^i = \cdots - \eta \alpha^{\mathrm{shiftAlphaPower}} \beta^i$ (use 1/M (?))
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0` (기본값) | `CCTK_REAL` |  |
{{< /table >}}

- `ML_BSSN::shiftAlphaPower` : $\partial_t \beta^i = \cdots - \eta \alpha^{\mathrm{shiftAlphaPower}} \beta^i$ (use 0 (?))
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0` (기본값) | `CCTK_REAL` |  |
{{< /table >}}

- `ML_BSSN::spatialBetaDriverRadius` : Radius at which the betaDriver starts to be reduced.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1000000000000` (기본값) | `CCTK_REAL` | 값은 $0$ 보다 커야 합니다. |
{{< /table >}}

- `ML_BSSN::spatialShiftGammaCoeffRadius` : Radius at which shiftGammaCoeff starts to be reduced.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `1000000000000` (기본값) | `CCTK_REAL` | 값은 $0$ 보다 커야 합니다. |
{{< /table >}}

- `ML_BSSN::minimumLapse` : Enforced minimum of the lapse function
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0` (기본값) | `CCTK_REAL` | 값은 $0$ 이상이어야 합니다. |
{{< /table >}}

- `ML_BSSN::epsDiss` : Dissipation strength. `STEERABLE=ALWAYS`
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0` (기본값) | `CCTK_REAL` | 값은 $0$ 이상이어야 합니다. |
{{< /table >}}



restricted:
CCTK_REAL LapseACoeff "(OUTDATED) Evolve time derivative of lapse A? (now evolveA)" STEERABLE=ALWAYS
{
  0. :: "off"
  1. :: "on"
  -1. :: "default"
} -1.

restricted:
CCTK_REAL ShiftBCoeff "(OUTDATED) Evolve time derivative of shift B^i? (now evolveB)" STEERABLE=ALWAYS
{
  0. :: "off"
  1. :: "on"
  -1. :: "default"
} -1.

restricted:
CCTK_REAL LapseAdvectionCoeff "(OUTDATED) Advect lapse? (now advectLapse)"
{
  0. :: "off"
  1. :: "on"
  -1. :: "default"
} -1.

restricted:
CCTK_REAL ShiftAdvectionCoeff "(OUTDATED) Advect shift? (now advectShift)"
{
  0. :: "off"
  1. :: "on"
  -1. :: "default"
} -1.

- `ML_BSSN::fdOrder` : Finite differencing order를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `2` | `CCTK_INT` |  |
| `4` (기본값) | `CCTK_INT` |  |
| `6` | `CCTK_INT` |  |
| `8` | `CCTK_INT` |  |
{{< /table >}}


- `ML_BSSN::conformalMethod` : Conformal factor에 대한 method를 결정합니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `0` (기본값) | `CCTK_INT` | $\phi$-method를 사용합니다. |
| `1` | `CCTK_INT` | $W$-method를 사용합니다. |
{{< /table >}}


restricted:
CCTK_INT evolveA "Evolve time derivative of lapse A? (former LapseACoeff)" STEERABLE=ALWAYS
{
  0 :: "off"
  1 :: "on"
} 0

restricted:
CCTK_INT evolveB "Evolve time derivative of shift B^i? (former ShiftBCoeff)" STEERABLE=ALWAYS
{
  0 :: "off"
  1 :: "on"
} 1

- `ML_BSSN::harmonicN` : $\partial_t \alpha = -f \alpha^n K$에서 $n$을 결정합니다. $n=2$이면 harmonic, $n=1$이면 1+log slicing입니다.
{{< table "table-striped">}}
| 값 | 타입 | 설명 |
|---|---|---|
| `2` (기본값) | `CCTK_INT` | 기본값은 harmonic slicing입니다. |
{{< /table >}}


restricted:
CCTK_INT shiftFormulation "shift formulation"
{
  0 :: "Gamma driver"
  1 :: "harmonic"
} 0

restricted:
CCTK_INT useSpatialBetaDriver "Enable spatially varying betaDriver"
{
  0 :: "off"
  1 :: "on"
} 0

restricted:
CCTK_INT useSpatialShiftGammaCoeff "Enable spatially varying shiftGammaCoeff"
{
  0 :: "off"
  1 :: "on"
} 0

restricted:
CCTK_INT advectLapse "Advect lapse? (former LapseAdvectionCoeff)" STEERABLE=ALWAYS
{
  0 :: "off"
  1 :: "on"
} 1

restricted:
CCTK_INT advectShift "Advect shift? (former ShiftAdvectionCoeff)" STEERABLE=ALWAYS
{
  0 :: "off"
  1 :: "on"
} 1

restricted:
CCTK_INT fixAdvectionTerms "Modify driver and advection terms to work better?"
{
  0 :: "off"
  1 :: "on"
} 0

restricted:
CCTK_INT tile_size "Loop tile size"
{
  *:* :: ""
} -1

restricted:
CCTK_KEYWORD initial_boundary_condition "Boundary condition for initial condition for some of the BSSN variables" STEERABLE=ALWAYS
{
  "scalar" :: "not recommended; use ML_BSSN_Helper's value 'extrapolate-gammas' instead"
} "scalar"

restricted:
CCTK_KEYWORD rhs_boundary_condition "Boundary condition for BSSN RHS and some of the ADMBase variables" STEERABLE=ALWAYS
{
  "scalar" :: "not recommended; use ML_BSSN_Helper's option 'NewRad' instead"
} "scalar"

restricted:
CCTK_KEYWORD rhs_evaluation "Whether and how the RHS routine should be split to improve performance" STEERABLE=ALWAYS
{
  "combined" :: "use a single routine (probably slow)"
  "splitBy" :: "split into 3 routines via Kranc"
} "splitBy"

restricted:
CCTK_KEYWORD my_initial_data "(OUTDATED)"
{
  "ADMBase" :: "from ADMBase"
  "default" :: "do nothing"
} "default"

restricted:
CCTK_KEYWORD my_initial_boundary_condition "(OUTDATED)"
{
  "none" :: "none"
  "default" :: "do nothing"
} "default"

restricted:
CCTK_KEYWORD my_rhs_boundary_condition "(OUTDATED)"
{
  "none" :: "none"
  "static" :: "static"
  "default" :: "do nothing"
} "default"

restricted:
CCTK_KEYWORD my_boundary_condition "(OUTDATED)"
{
  "none" :: "none"
  "Minkowski" :: "Minkowski"
  "default" :: "do nothing"
} "default"

private:
CCTK_KEYWORD dt_lapse_shift_method "(OUTDATED) Treatment of ADMBase dtlapse and dtshift"
{
  "correct" :: "(unused)"
  "noLapseShiftAdvection" :: "(unused)"
  "default" :: "do nothing"
} "default"

restricted:
CCTK_KEYWORD apply_dissipation "(OUTDATED) Whether to apply dissipation to the RHSs"
{
  "always" :: "yes"
  "never" :: "no"
  "default" :: "do nothing"
} "default"

restricted:
CCTK_INT ML_BSSN_MaxNumEvolvedVars "Number of evolved variables used by this thorn" ACCUMULATOR-BASE=MethodofLines::MoL_Num_Evolved_Vars STEERABLE=RECOVER
{
  25:25 :: "Number of evolved variables used by this thorn"
} 25

restricted:
CCTK_INT ML_BSSN_MaxNumArrayEvolvedVars "Number of Array evolved variables used by this thorn" ACCUMULATOR-BASE=MethodofLines::MoL_Num_ArrayEvolved_Vars STEERABLE=RECOVER
{
  0:0 :: "Number of Array evolved variables used by this thorn"
} 0

restricted:
CCTK_INT timelevels "Number of active timelevels" STEERABLE=RECOVER
{
  0:4 :: ""
} 3

restricted:
CCTK_INT rhs_timelevels "Number of active RHS timelevels" STEERABLE=RECOVER
{
  0:4 :: ""
} 1

restricted:
CCTK_INT ML_BSSN_InitialADMBase1Everywhere_calc_every "ML_BSSN_InitialADMBase1Everywhere_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_InitialADMBase2Interior_calc_every "ML_BSSN_InitialADMBase2Interior_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_InitialADMBase2BoundaryScalar_calc_every "ML_BSSN_InitialADMBase2BoundaryScalar_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_EnforceEverywhere_calc_every "ML_BSSN_EnforceEverywhere_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_ADMBaseEverywhere_calc_every "ML_BSSN_ADMBaseEverywhere_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_ADMBaseInterior_calc_every "ML_BSSN_ADMBaseInterior_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_ADMBaseBoundaryScalar_calc_every "ML_BSSN_ADMBaseBoundaryScalar_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_EvolutionInterior_calc_every "ML_BSSN_EvolutionInterior_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_EvolutionInteriorSplitBy1_calc_every "ML_BSSN_EvolutionInteriorSplitBy1_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_EvolutionInteriorSplitBy2_calc_every "ML_BSSN_EvolutionInteriorSplitBy2_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_EvolutionInteriorSplitBy3_calc_every "ML_BSSN_EvolutionInteriorSplitBy3_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_EvolutionBoundaryScalar_calc_every "ML_BSSN_EvolutionBoundaryScalar_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_EvolutionAnalysisInit_calc_every "ML_BSSN_EvolutionAnalysisInit_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_EvolutionAnalysisInterior_calc_every "ML_BSSN_EvolutionAnalysisInterior_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_ConstraintsEverywhere_calc_every "ML_BSSN_ConstraintsEverywhere_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_ConstraintsInterior_calc_every "ML_BSSN_ConstraintsInterior_calc_every" STEERABLE=ALWAYS
{
  *:* :: ""
} 1

restricted:
CCTK_INT ML_BSSN_InitialADMBase1Everywhere_calc_offset "ML_BSSN_InitialADMBase1Everywhere_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_InitialADMBase2Interior_calc_offset "ML_BSSN_InitialADMBase2Interior_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_InitialADMBase2BoundaryScalar_calc_offset "ML_BSSN_InitialADMBase2BoundaryScalar_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_EnforceEverywhere_calc_offset "ML_BSSN_EnforceEverywhere_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_ADMBaseEverywhere_calc_offset "ML_BSSN_ADMBaseEverywhere_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_ADMBaseInterior_calc_offset "ML_BSSN_ADMBaseInterior_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_ADMBaseBoundaryScalar_calc_offset "ML_BSSN_ADMBaseBoundaryScalar_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_EvolutionInterior_calc_offset "ML_BSSN_EvolutionInterior_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_EvolutionInteriorSplitBy1_calc_offset "ML_BSSN_EvolutionInteriorSplitBy1_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_EvolutionInteriorSplitBy2_calc_offset "ML_BSSN_EvolutionInteriorSplitBy2_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_EvolutionInteriorSplitBy3_calc_offset "ML_BSSN_EvolutionInteriorSplitBy3_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_EvolutionBoundaryScalar_calc_offset "ML_BSSN_EvolutionBoundaryScalar_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_EvolutionAnalysisInit_calc_offset "ML_BSSN_EvolutionAnalysisInit_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_EvolutionAnalysisInterior_calc_offset "ML_BSSN_EvolutionAnalysisInterior_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_ConstraintsEverywhere_calc_offset "ML_BSSN_ConstraintsEverywhere_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

restricted:
CCTK_INT ML_BSSN_ConstraintsInterior_calc_offset "ML_BSSN_ConstraintsInterior_calc_offset" STEERABLE=ALWAYS
{
  *:* :: ""
} 0

private:
CCTK_KEYWORD phi_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD gt11_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD gt12_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD gt13_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD gt22_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD gt23_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD gt33_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD Xt1_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD Xt2_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD Xt3_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD trK_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD At11_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD At12_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD At13_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD At22_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD At23_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD At33_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD alpha_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD A_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD beta1_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD beta2_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD beta3_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD B1_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD B2_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD B3_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "skip"

private:
CCTK_KEYWORD ML_log_confac_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_KEYWORD ML_metric_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_KEYWORD ML_Gamma_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_KEYWORD ML_trace_curv_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_KEYWORD ML_curv_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_KEYWORD ML_lapse_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_KEYWORD ML_dtlapse_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_KEYWORD ML_shift_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_KEYWORD ML_dtshift_bound "Boundary condition to implement" STEERABLE=ALWAYS
{
  "flat" :: "Flat boundary condition"
  "none" :: "No boundary condition"
  "static" :: "Boundaries held fixed"
  "radiative" :: "Radiation boundary condition"
  "scalar" :: "Dirichlet boundary condition"
  "newrad" :: "Improved radiative boundary condition"
  "skip" :: "skip boundary condition code"
} "none"

private:
CCTK_REAL phi_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL gt11_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL gt12_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL gt13_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL gt22_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL gt23_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL gt33_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL Xt1_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL Xt2_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL Xt3_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL trK_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL At11_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL At12_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL At13_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL At22_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL At23_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL At33_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL alpha_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL A_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL beta1_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL beta2_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL beta3_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL B1_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL B2_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL B3_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_log_confac_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_metric_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_Gamma_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_trace_curv_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_curv_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_lapse_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_dtlapse_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_shift_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL ML_dtshift_bound_speed "characteristic speed at boundary" STEERABLE=ALWAYS
{
  0:* :: "outgoing characteristic speed > 0"
} 1.

private:
CCTK_REAL phi_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL gt11_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL gt12_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL gt13_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL gt22_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL gt23_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL gt33_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL Xt1_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL Xt2_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL Xt3_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL trK_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL At11_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL At12_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL At13_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL At22_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL At23_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL At33_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL alpha_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL A_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL beta1_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL beta2_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL beta3_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL B1_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL B2_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL B3_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_log_confac_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_metric_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_Gamma_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_trace_curv_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_curv_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_lapse_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_dtlapse_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_shift_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL ML_dtshift_bound_limit "limit value for r -> infinity" STEERABLE=ALWAYS
{
  *:* :: "value of limit value is unrestricted"
} 0.

private:
CCTK_REAL phi_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL gt11_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL gt12_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL gt13_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL gt22_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL gt23_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL gt33_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL Xt1_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL Xt2_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL Xt3_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL trK_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL At11_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL At12_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL At13_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL At22_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL At23_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL At33_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL alpha_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL A_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL beta1_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL beta2_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL beta3_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL B1_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL B2_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL B3_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_log_confac_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_metric_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_Gamma_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_trace_curv_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_curv_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_lapse_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_dtlapse_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_shift_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

private:
CCTK_REAL ML_dtshift_bound_scalar "Dirichlet boundary value" STEERABLE=ALWAYS
{
  *:* :: "unrestricted"
} 0.

