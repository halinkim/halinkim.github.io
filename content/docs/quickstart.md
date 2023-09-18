+++
weight = 1
date = "2023-08-23"
draft = false
author = "D.C.Kim"
title = "시작하기"
icon = "rocket_launch"
toc = true
description = "Einstein Toolkit 설치"
tags = ["Beginners"]
+++

{{< alert context="info" text="본 문서에서는 [Einstein Toolkit](https://einsteintoolkit.org/index.html)을 설치하는 과정에 대해서 다룹니다." />}}



## 요구사항

- **Linux** (Ubuntu 20.04 확인됨)
- **Git, Subversion, Curl, Python2/3, GCC, GFortran, MPI**
    - Linux가 Minimal 버전일 경우 위의 패키지를 수동으로 설치해주어야 합니다.
    - 앞서 패키지 리스트 최신화를 권장합니다.
    ```shell
    sudo apt update                     # 패키지 리스트 업데이트
    sudo apt install git
    sudo apt-get install subversion
    sudo apt install curl
    sudo apt install python2/3
    sudo apt-get install build-essential
    sudo apt-get install gfortran
    sudo apt-get install mpi
    ```

## 다운로드

#### 설치 경로 확인

Einstein Toolkit을 설치할 적절한 디렉토리를 정하여 이동합니다. 일반적으로 `home/{계정명}`에 설치하는 것을 권장합니다. 현재 어떤 디렉토리에 위치해 있든 `cd`를 이용하여 해당 디렉토리로 이동할 수 있습니다. 이후 `pwd`를 이용하여 현재 디렉토리를 확인합니다.
```shell
cd
pwd
```
#### 최신 버전 다운로드

[여기](https://einsteintoolkit.org/download.html)에서 최신 버전을 확인할 수 있습니다. 2023년 8월 23일 기준, 최신 버전(Schwarzschild)의 Einstein Toolkit을 다운로드하는 명령어는 다음과 같습니다.
```shell
curl -kLO https://raw.githubusercontent.com/gridaphobe/CRL/ET_2023_05/GetComponents
chmod a+x GetComponents
./GetComponents --parallel https://bitbucket.org/einsteintoolkit/manifest/raw/ET_2023_05/einsteintoolkit.th
```

{{< alert context="info" text="아래 `SelfForce-1D`, `Kuibit`은 필요한 경우 설치해도 됩니다. 지금 설치하지 않아도 Einstein Toolkit을 사용하는 데 문제 없습니다." />}}
`SelfForce-1D`는 아직 Cactus에 속해 있지 않기 때문에 직접 다운로드 해주어야 합니다. 다음 명령어를 사용할 수 있습니다. 명령어에 포함된 버전(`ET_2023_05`)이 위와 맞는 지 확인이 필요할 수 있습니다.
```shell
git clone -b ET_2023_05 https://bitbucket.org/peterdiener/selfforce-1d.git SelfForce-1D
```
`Kuibit`은 다음 명령어를 사용하여 설치할 수 있습니다. 파이썬 3.6.1 이상의 버전이 필요합니다.
```shell
pip install --user -U kuibit==1.3.6 # requires Python3 version 3.6.1 or greater
```

## 설정 및 빌드
이제 설치 경로에 `Cactus`폴더가 만들어졌습니다. `ls`로 현재 디렉토리에서 폴더와 파일 리스트를 확인할 수 있습니다. `Cactus` 폴더가 있는지 확인합니다. 이후 `cd`를 이용하여 `Cactus` 폴더로 이동합니다.
```shell
ls
cd Cactus
```
이제 다음 명령어를 사용하여 초기 설정을 합니다. 적절한 정보를 기입합니다. 작성된 정보는 `/simfactory/mdb/machines`에 `{hostname}.ini`파일로 저장됩니다.
```shell
./simfactory/bin/sim setup-silent
```

이제 다음 명령어를 사용하여 Einstein Toolkit을 빌드합니다. 아래 과정은 시간이 조금 소요될 수 있습니다.
```shell
./simfactory/bin/sim build -j2 --thornlist thornlists/einsteintoolkit.th
```
여기까지 문제 없이 진행되었다면 Einstein Toolkit을 사용할 준비가 완료되었습니다. 다음 명령어를 사용하여 간단한 테스트를 할 수 있습니다.
```shell
./simfactory/bin/sim create-run helloworld --parfile arrangements/CactusExamples/HelloWorld/par/HelloWorld.par
```
이후 다음과 같이 출력되었다면 정상적으로 작동하는 것입니다.
```text
INFO (HelloWorld): Hello World!
```

#### Cactus의 대략적 구조
`Cactus`폴더 내의 구조는 대략적으로 다음과 같습니다. 일부 폴더 및 파일은 생략되었습니다. `doc`, `par`, `simfactory`, `src` 등의 폴더는 링크된 폴더입니다. `ls -al`을 사용하여 어디에 링크되어 있는지 확인할 수 있습니다.
```treeview
Cactus/
├── arrangements/
├── bin/
├── configs/
├── exe/
├── repos/
├── thornlists/
├── utils/
├── doc/
├── par/
│   ├── GW150914/
│   ├── arXiv-1111.3344/
│   ├── qc0-mclachlan.par
│   └── tov_ET.par
├── simfactory/
└── src/
```
