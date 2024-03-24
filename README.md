# Rexauth
MERN stack app that provides authentication system out of the box using `http only cookies` and `jwt`

## Why another authentication project?

- Most tutorials and project store `jwt` tokens in `localstorage` which makes them exposed in client js and vulnerable to `XSS` attack, Rexauth uses `httponly cookie` (+`sameSite: "strict"`) for storing `jwt` for better security 🔒
- Many devs only do client side form validation and neglect server side validation when the latter is more important ✊
- Solutions like [Clerk](https://clerk.com), [Kinde](https://kinde.com).. offer good abstractions on how to deal with authentication. This project is for those who want to roll their own auth in their Mern Apps 👍
- Other auth projects use Javascript in the express server and/or in react. Rexauth uses Typescript to better reflect real world projects 🌎


## 🚀 Quick Start
### 1- Create a folder somewhere and run this command in it
```bash
git clone https://github.com/tarek-mo/rexauth.git ./
```

### 2- Install backend/frontend/root dependencies all at once
Stay in the root folder (not inside `backend` or `frontend`) and run
```bash
npm run install
```

### 3- Replace `.env.sample` file placeholder values with ur mongodb_uri and jwt secret (choose a jwt secret on ur own)


### 4- Run both backend and frontend at once using `concurrently` 
```bash
npm run dev
```
### 5- Congrats 🎉, now you can go to `localhost:3000` on your browser and view the app live 
![image](https://github.com/tarek-mo/rexauth/assets/78443648/d3c0ca17-943d-4285-a4a3-d8385e7e6134)

## Contributing
If you have suggestions to make this project better by adding new features, feel free to open an issue or submit a pull request. I'll review your code and merge it


