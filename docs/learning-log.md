# RepoFit Packet Learning Log

## TypeScript와 저장소 증거 분석

- `??`, `Set<string>`, `Boolean(...trim())`, `Object.keys()`를 RepoFit Packet 코드에서 직접 확인했다.
- `||`는 `0`, `false`, `""`, `NaN`, `null`, `undefined`처럼 falsy인 값을 모두 대체 대상으로 판단한다.
- `??`는 `null`과 `undefined`일 때만 오른쪽 값을 사용한다.
- `Set<string>`은 문자열을 중복 없이 보관할 때 사용한다.
- `Boolean(value.trim())`은 문자열의 앞뒤 공백을 제거한 뒤 내용이 존재하는지를 `true` 또는 `false`로 변환한다.
- `Object.keys(object)`는 객체에서 프로퍼티 이름을 배열로 가져온다.
- `dependencies`와 `devDependencies`를 합쳐 반복문으로 기술 후보를 검사하는 흐름을 이해했다.

## 프론트엔드와 백엔드의 입력 검증

- 프론트엔드 검증은 사용자가 잘못된 값을 입력했을 때 빠르게 피드백하기 위해 사용한다.
- 백엔드 검증은 잘못된 데이터가 서버의 처리 로직이나 데이터베이스까지 들어가는 것을 막기 위해 사용한다.
- 프론트 요청은 직접 조작할 수 있으므로 백엔드에서도 다시 검증해야 한다.
- 백엔드 검증은 아직 코드로 직접 확인하지 않았으며 다음 단계에서 구현한다.

## HTTP 요청의 기본 흐름

- GET과 POST는 프론트엔드만의 기능이 아니라 클라이언트와 서버가 사용하는 HTTP 메서드다.
- GET은 주로 서버의 데이터를 요청할 때 사용한다.
- POST는 데이터를 서버에 전달해 생성이나 처리를 요청할 때 사용한다.
- Spring은 HTTP 메서드와 주소가 일치하는 Controller 메서드를 찾아 실행한다.
- 처리가 끝난 Java 객체는 Spring에 의해 JSON으로 변환되어 클라이언트에 전달된다.

## Spring Boot 서버 시작

- Java 21과 Spring Boot 실행 환경을 구성했다.
- `RepofitBackendApplication`은 요청을 직접 처리하는 곳이 아니라 Spring Boot 서버를 시작하는 메인 클래스다.
- 서버가 시작될 때 Spring이 Controller 같은 구성요소를 찾아 등록한다.
- 서버 실행 후 요청이 들어오면 Spring이 주소와 HTTP 메서드가 맞는 Controller 메서드로 연결한다.

````text
main() 실행
→ Spring Boot 서버 시작
→ Controller 같은 구성요소 검색 및 등록
→ HTTP 요청 대기
## 현재 이해한 전체 흐름

```text
React가 JSON을 HTTP 요청으로 전송한다.
→ Spring이 HTTP 메서드와 주소에 맞는 Controller 메서드를 찾는다.
→ 요청 JSON을 DTO로 변환한다.
→ DTO의 입력값을 검증한다.
→ Service가 패킷 생성과 같은 실제 작업을 처리한다.
→ 필요한 경우 Repository를 통해 DB에 접근한다.
→ 처리 결과를 JSON으로 React에 응답한다.
````

backend : 메인 클래스는 요청을 직접 처리하는 곳이 아니라 Spring 서버와 구성요소를 준비해 실행하는 시작점이다
=> 메인 클래스는 서버를 시작하고 Controller를 미리 등록하며 실행 후 들어오는 요청은 Spring이 주소와 HTTP 메서드에 맞는 Controller로 연결

## GET 요청 처리

- `@RestController`는 클래스를 HTTP 요청을 처리하는 Controller로 등록한다.
- `@GetMapping("/api/health")`은 `GET /api/health` 요청과 `health()` 메서드를 연결한다.
- `health()`가 반환한 Java `Map`은 Spring에 의해 JSON으로 변환된다.
- `Map.of()`의 항목 순서는 보장되지 않으며 JSON 객체도 필드 순서가 중요하지 않다.

````text
GET /api/health
→ HealthController의 health() 실행
→ Java Map 반환
→ Spring이 JSON으로 변환
→ 브라우저에 응답
### 현재 확인한 요청 흐름

```text
POST 요청
→ JSON을 CreatePacketRequest DTO로 변환
→ @Valid가 @NotBlank와 @Size 규칙 검사
→ 성공: Controller 메서드 실행 후 JSON 응답
→ 실패: Controller 메서드를 실행하지 않고 400 응답
````

- 기존 `health()` 구조를 참고해 `GET /api/version` API를 직접 추가하고, Java `Map`이 JSON 응답으로 변환되는 것을 확인했다.
