## 현재 구현 기능

- 회사명, 직무명, 채용공고, GitHub 저장소 URL 입력
- GitHub 저장소 기본 정보 조회
- README와 `package.json` 조회
- 채용공고에서 기술 요구사항 추출
- 저장소에서 포트폴리오 근거 생성
- 채용 요구사항과 저장소 근거 비교
- 부족한 항목을 보완 작업으로 생성
- 패킷과 보완 작업 상태 관리
- `localStorage`를 이용한 브라우저 저장
- 지원 패킷 Markdown 파일 내보내기

## 현재 기술 스택

### Frontend

- React
- TypeScript
- Vite
- GitHub REST API
- localStorage
- Vitest

### Backend

Java와 Spring Boot를 이용한 백엔드 도입을 준비하고 있습니다.

첫 번째 백엔드 목표는 React 요청을 Spring Controller가 받아 JSON으로 응답하는 가장 작은 API를 구현하는 것입니다.

## 다음 구현 단계

1. Java 21과 Spring Boot 실행 환경 구성
2. `GET /api/health` API 구현
3. React에서 백엔드 상태 조회
4. `POST /api/packets` 요청 데이터 수신
5. DTO 입력 검증
6. PostgreSQL을 이용한 패킷 저장과 조회
7. 이메일 전송 기능 구현

## 프로젝트를 통해 학습할 내용

- React 상태와 서버 데이터의 차이
- HTTP 요청과 응답의 흐름
- JSON과 Java 객체의 변환
- Controller, DTO, Service, Repository의 역할
- 프론트엔드 검증과 백엔드 검증의 차이
- 데이터베이스 저장과 조회
- 외부 이메일 서비스 연동
- 핵심 로직 테스트 작성

## 현재 상태

프론트엔드에서 GitHub 저장소를 분석하고 지원 패킷을 생성하는 흐름까지 구현했습니다.

다음 단계에서는 작은 Spring Boot API부터 시작해 기존 프론트엔드와 백엔드를 연결합니다.
