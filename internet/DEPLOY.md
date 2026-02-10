# 인터넷가입연구소 - 배포 가이드

## 가장 간단한 방법: Netlify Drop (추천)

1. **https://app.netlify.com/drop** 접속
2. 브라우저에 `c:\Users\GLOSEE\Desktop\internet` 폴더를 **드래그 앤 드롭**
3. 몇 초 후 배포 완료! 자동으로 URL이 생성됩니다.
   - 예: `https://random-name-123.netlify.app`

> 별도 가입 없이도 가능하지만, URL을 저장하려면 Netlify 회원가입 권장

---

## GitHub Pages (무료, 도메인 가능)

### 1. GitHub 저장소 생성
- https://github.com/new 에서 새 저장소 생성
- 이름: `internet` (또는 원하는 이름)
- Public 선택 후 Create

### 2. 프로젝트 업로드
```bash
cd c:\Users\GLOSEE\Desktop\internet
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/본인아이디/internet.git
git push -u origin main
```

### 3. GitHub Pages 활성화
- 저장소 → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: `main` / 폴더: `/ (root)`
- Save

몇 분 후 `https://본인아이디.github.io/internet/` 에서 확인 가능

---

## Vercel (무료)

1. **https://vercel.com** 접속 후 회원가입
2. **Add New** → **Project**
3. GitHub 연결 후 저장소 선택, 또는 **Import** 로 폴더 업로드
4. Deploy 클릭

`https://인터넷가입연구소.vercel.app` 형태의 URL 제공
