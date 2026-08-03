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
- 프론트 검증을 통과했더라도 요청은 직접 조작될 수 있으므로 백엔드 검증도 필요하다.

## HTTP 요청과 Spring의 처리 흐름

- GET과 POST는 프론트엔드만의 기능이 아니라 클라이언트와 서버가 사용하는 HTTP 메서드다.
- GET은 주로 데이터를 요청할 때 사용한다.
- POST는 데이터를 서버에 전달해 생성이나 처리를 요청할 때 사용한다.
- Spring은 HTTP 메서드와 주소가 일치하는 Controller 메서드를 찾아 실행한다.
- `@PostMapping`은 POST 요청과 특정 주소를 Controller 메서드에 연결한다.
- 요청에 포함된 JSON은 Spring에 의해 Java DTO 객체로 변환된다.
- DTO는 서버가 받을 요청 데이터의 이름과 타입을 표현한다.
- 검증 애노테이션과 `@Valid`를 사용해 DTO에 들어온 값을 검증할 수 있다.
- Controller는 HTTP 요청을 받고 실제 처리 코드를 호출한 뒤 결과를 응답한다.
- Service는 패킷 생성과 분석처럼 RepoFit의 실제 기능을 처리한다.
- Repository는 필요한 경우 데이터베이스 저장과 조회를 담당한다.
- 처리가 끝난 결과는 다시 JSON으로 변환되어 React에 전달된다.

## 현재 이해한 전체 흐름

```text
React가 JSON을 HTTP 요청으로 전송한다.
→ Spring이 HTTP 메서드와 주소에 맞는 Controller 메서드를 찾는다.
→ 요청 JSON을 DTO로 변환한다.
→ DTO의 입력값을 검증한다.
→ Service가 패킷 생성과 같은 실제 작업을 처리한다.
→ 필요한 경우 Repository를 통해 DB에 접근한다.
→ 처리 결과를 JSON으로 React에 응답한다.
```

## 아직 구현하며 확인할 내용

- `@RestController`와 `@PostMapping`이 각각 맡는 역할
- JSON을 DTO로 변환하는 과정
- `@Valid`와 `@NotBlank`가 검증을 실행하는 방식
- Controller와 Service를 나누는 이유
- DTO에 정의하지 않은 JSON 필드가 들어왔을 때의 기본 동작
