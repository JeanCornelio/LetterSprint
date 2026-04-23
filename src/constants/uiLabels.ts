import { Difficulty, TypingLanguage } from "../interfaces/testConfiguration";

type UiLabels = {
  punctuation: string;
  numbers: string;
  difficulties: Record<Difficulty, string>;
  time: string;
  words: string;
  testSettings: string;
  sound: string;
  openTools: string;
  locale: string;
  nav: {
    signIn: string;
    goToLogin: string;
    openLanguageMenu: string;
  };
  auth: {
    createAccountTitle: string;
    loginTitle: string;
    createAccountSubtitle: string;
    loginSubtitle: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    usernamePlaceholder: string;
    verifyEmailPlaceholder: string;
    verifyPasswordPlaceholder: string;
    signIn: string;
    signUp: string;
    or: string;
    back: string;
    signInWithGoogle: string;
    signInWithGithub: string;
    accountName: string;
    enterUsernameBeforeContinue: string;
    closeModal: string;
    ok: string;
    errors: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordMinLength: string;
      usernameRequired: string;
      usernameMinLength: string;
      usernameMaxLength: string;
      usernameNotAvailable: (username: string) => string;
      emailsNotMatch: string;
      passwordsNotMatch: string;
    };
    toasts: {
      accountCreated: string;
      verifyEmailBeforeSignIn: string;
      invalidCredentials: string;
      signInFailed: string;
      userNotFound: string;
      loadingUserError: string;
    };
  };
  userMenu: {
    profile: string;
    signOut: string;
  };
  userPage: {
    testsCompleted: string;
    totalWords: string;
    timeTyping: string;
    noTestsCompleted: string;
    loadMore: string;
    timeRecords: string;
    wordRecords: string;
    historyTitle: string;
  };
  results: {
    characters: string;
    time: string;
    wpm: string;
    words: string;
    precision: string;
    raw: string;
    charactersTooltip: string;
    wpmTooltip: (wpm: number) => string;
    rawTooltip: (raw: number) => string;
    precisionTooltip: (precision: number, correct: number, incorrect: number) => string;
    signInToSavePrefix: string;
    signInToSaveLink: string;
    signInToSaveSuffix: string;
    modeResultSeconds: (seconds: number) => string;
    modeResultWords: (words: number) => string;
  };
  table: {
    wpm: string;
    raw: string;
    precision: string;
    characters: string;
    mode: string;
    date: string;
  };
  utility: {
    repeatTest: string;
    restartTest: string;
    pageNotFound: string;
    pageNotFoundFallback: string;
    goBack: string;
    avatarAlt: string;
    github: string;
    linkedin: string;
    byAuthor: string;
  };
};

export const UI_LABELS: Record<TypingLanguage, UiLabels> = {
  en: {
    punctuation: "Punctuation",
    numbers: "Numbers",
    difficulties: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
    },
    time: "Time",
    words: "Words",
    testSettings: "Test settings",
    sound: "Sound",
    openTools: "Open tools",
    locale: "en-US",
    nav: {
      signIn: "Sign in",
      goToLogin: "Go to login",
      openLanguageMenu: "Open language menu",
    },
    auth: {
      createAccountTitle: "Create an Account",
      loginTitle: "Login to Your Account",
      createAccountSubtitle:
        "Join LetterSprint and start improving your typing speed today!",
      loginSubtitle:
        "Challenge yourself by testing your typing speed and accuracy. Push your limits, beat your personal bests, and climb to the top of the leaderboard.",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      usernamePlaceholder: "Username",
      verifyEmailPlaceholder: "Verify email",
      verifyPasswordPlaceholder: "Verify password",
      signIn: "Sign in",
      signUp: "Sign up",
      or: "or",
      back: "Back",
      signInWithGoogle: "Sign in with Google",
      signInWithGithub: "Sign in with GitHub",
      accountName: "Account name",
      enterUsernameBeforeContinue: "Please enter a username before continuing",
      closeModal: "Close modal",
      ok: "OK",
      errors: {
        emailRequired: "Email is required, cannot be empty",
        emailInvalid: "Email is not valid",
        passwordRequired: "Password is required",
        passwordMinLength: "Password cannot be less than 6 characters",
        usernameRequired: "Username is required, cannot be empty",
        usernameMinLength: "Username cannot be less than 3 characters",
        usernameMaxLength: "Username cannot be longer than 15 characters",
        usernameNotAvailable: (username: string) =>
          `The username ${username} is not available`,
        emailsNotMatch: "Emails do not match",
        passwordsNotMatch: "Passwords do not match",
      },
      toasts: {
        accountCreated:
          "Account created successfully! Please check your email to verify your account.",
        verifyEmailBeforeSignIn: "Please verify your email before signing in.",
        invalidCredentials: "Invalid email or password. Please try again.",
        signInFailed: "Sign in failed. Please try again.",
        userNotFound: "User not found. Please try again.",
        loadingUserError: "Error loading user data. Please try again.",
      },
    },
    userMenu: {
      profile: "Profile",
      signOut: "Sign out",
    },
    userPage: {
      testsCompleted: "Tests completed",
      totalWords: "Total words",
      timeTyping: "Time typing",
      noTestsCompleted: "No tests completed yet",
      loadMore: "Load more",
      timeRecords: "Time records",
      wordRecords: "Word records",
      historyTitle: "Recent tests",
    },
    results: {
      characters: "CHARACTERS",
      time: "TIME",
      wpm: "WPM",
      words: "WORDS",
      precision: "PRECISION",
      raw: "RAW",
      charactersTooltip: "correct, incorrect, extra, missed",
      wpmTooltip: (wpm: number) => `${wpm} WPM`,
      rawTooltip: (raw: number) => `${raw} WPM`,
      precisionTooltip: (precision: number, correct: number, incorrect: number) =>
        `${precision} % (${correct} correct / ${incorrect} incorrect)`,
      signInToSavePrefix: "",
      signInToSaveLink: "Sign in",
      signInToSaveSuffix: " to save your result",
      modeResultSeconds: (seconds: number) => `${seconds} Seconds`,
      modeResultWords: (words: number) => `${words} Words`,
    },
    table: {
      wpm: "WPM",
      raw: "Raw",
      precision: "Precision",
      characters: "Characters",
      mode: "Mode",
      date: "Date",
    },
    utility: {
      repeatTest: "Repeat test",
      restartTest: "Restart test",
      pageNotFound: "Page not found",
      pageNotFoundFallback: "The page you're looking for doesn't exist.",
      goBack: "Go back",
      avatarAlt: "Profile avatar",
      github: "GitHub",
      linkedin: "LinkedIn",
      byAuthor: "By: Jean Cornelio with 💓",
    },
  },
  es: {
    punctuation: "Puntuación",
    numbers: "Números",
    difficulties: {
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
    },
    time: "Tiempo",
    words: "Palabras",
    testSettings: "Ajustes de prueba",
    sound: "Sonido",
    openTools: "Abrir herramientas",
    locale: "es-ES",
    nav: {
      signIn: "Iniciar sesión",
      goToLogin: "Ir a iniciar sesión",
      openLanguageMenu: "Abrir menú de idioma",
    },
    auth: {
      createAccountTitle: "Crear una cuenta",
      loginTitle: "Inicia sesión en tu cuenta",
      createAccountSubtitle:
        "Únete a LetterSprint y empieza a mejorar tu velocidad de escritura hoy.",
      loginSubtitle:
        "Ponte a prueba midiendo tu velocidad y precisión al escribir. Supera tus límites, mejora tus marcas personales y sube en la clasificación.",
      emailPlaceholder: "Correo",
      passwordPlaceholder: "Contraseña",
      usernamePlaceholder: "Nombre de usuario",
      verifyEmailPlaceholder: "Confirmar correo",
      verifyPasswordPlaceholder: "Confirmar contraseña",
      signIn: "Iniciar sesión",
      signUp: "Registrarse",
      or: "o",
      back: "Volver",
      signInWithGoogle: "Iniciar sesión con Google",
      signInWithGithub: "Iniciar sesión con GitHub",
      accountName: "Nombre de la cuenta",
      enterUsernameBeforeContinue:
        "Ingresa un nombre de usuario antes de continuar",
      closeModal: "Cerrar modal",
      ok: "Aceptar",
      errors: {
        emailRequired: "El correo es obligatorio",
        emailInvalid: "El correo no es válido",
        passwordRequired: "La contraseña es obligatoria",
        passwordMinLength: "La contraseña debe tener al menos 6 caracteres",
        usernameRequired: "El nombre de usuario es obligatorio",
        usernameMinLength: "El nombre de usuario debe tener al menos 3 caracteres",
        usernameMaxLength: "El nombre de usuario no puede tener más de 15 caracteres",
        usernameNotAvailable: (username: string) =>
          `El nombre de usuario ${username} no está disponible`,
        emailsNotMatch: "Los correos no coinciden",
        passwordsNotMatch: "Las contraseñas no coinciden",
      },
      toasts: {
        accountCreated:
          "¡Cuenta creada con éxito! Revisa tu correo para verificar tu cuenta.",
        verifyEmailBeforeSignIn:
          "Verifica tu correo antes de iniciar sesión.",
        invalidCredentials:
          "Correo o contraseña incorrectos. Inténtalo de nuevo.",
        signInFailed: "No se pudo iniciar sesión. Inténtalo de nuevo.",
        userNotFound: "Usuario no encontrado. Inténtalo de nuevo.",
        loadingUserError:
          "Error al cargar los datos del usuario. Inténtalo de nuevo.",
      },
    },
    userMenu: {
      profile: "Perfil",
      signOut: "Cerrar sesión",
    },
    userPage: {
      testsCompleted: "Pruebas completadas",
      totalWords: "Total de palabras",
      timeTyping: "Tiempo escribiendo",
      noTestsCompleted: "Todavía no hay pruebas completadas",
      loadMore: "Cargar más",
      timeRecords: "Récords por tiempo",
      wordRecords: "Récords por palabras",
      historyTitle: "Pruebas recientes",
    },
    results: {
      characters: "CARACTERES",
      time: "TIEMPO",
      wpm: "PPM",
      words: "PALABRAS",
      precision: "PRECISIÓN",
      raw: "BRUTO",
      charactersTooltip: "correctas, incorrectas, extra, omitidas",
      wpmTooltip: (wpm: number) => `${wpm} PPM`,
      rawTooltip: (raw: number) => `${raw} PPM`,
      precisionTooltip: (precision: number, correct: number, incorrect: number) =>
        `${precision} % (${correct} correctas / ${incorrect} incorrectas)`,
      signInToSavePrefix: "",
      signInToSaveLink: "Inicia sesión",
      signInToSaveSuffix: " para guardar tu resultado",
      modeResultSeconds: (seconds: number) => `${seconds} Segundos`,
      modeResultWords: (words: number) => `${words} Palabras`,
    },
    table: {
      wpm: "PPM",
      raw: "Bruto",
      precision: "Precisión",
      characters: "Caracteres",
      mode: "Modo",
      date: "Fecha",
    },
    utility: {
      repeatTest: "Repetir prueba",
      restartTest: "Reiniciar prueba",
      pageNotFound: "Página no encontrada",
      pageNotFoundFallback: "La página que buscas no existe.",
      goBack: "Volver",
      avatarAlt: "Avatar de perfil",
      github: "GitHub",
      linkedin: "LinkedIn",
      byAuthor: "Por: Jean Cornelio con 💓",
    },
  },
};
