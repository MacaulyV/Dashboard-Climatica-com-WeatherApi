import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { motion } from "framer-motion";

const Login = () => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [receberNotificacoes, setReceberNotificacoes] = useState(false);

  const handleInputFocus = (inputId: string) => {
    setFocusedInput(inputId);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleCheckboxChange = () => {
    setReceberNotificacoes(!receberNotificacoes);
  };

  const videoPaths = [
    "/video/Capa1.mp4",
    "/video/Capa1.mp4",
    "/video/Capa1.mp4",
  ];

  const selectRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videoPaths.length);
    return videoPaths[randomIndex];
  };

  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    setSelectedVideo(selectRandomVideo());
  }, []);

  return (
    <main className={styles.TelaLogin}>
      <div className={styles.Conteudo}>
        <motion.div
          className={styles.Formulario}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.Buttons}>
            <motion.img
              src="/image/Logo.svg"
              alt=""
              className={styles.IconLogin}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <h4 className={styles.Titulo}>Inscreva-se ou faça login com</h4>
            <button className={styles.customButton}>
              <svg
                className={styles.svg1}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 50 50"
              >
                <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
              </svg>
              <span className={styles.TextIcon1}>Apple</span>
            </button>
            <br />
            <button className={styles.customButton}>
              <svg
                className={styles.svg2}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 120 120"
              >
                <path
                  d="M107.145,55H100H87.569H60v18h27.569c-1.852,5.677-5.408,10.585-10.063,14.118 C72.642,90.809,66.578,93,60,93c-12.574,0-23.278-8.002-27.299-19.191C31.6,70.745,31,67.443,31,64c0-3.839,0.746-7.505,2.101-10.858 C37.399,42.505,47.823,35,60,35c7.365,0,14.083,2.75,19.198,7.273l13.699-13.21 C84.305,20.969,72.736,16,60,16c-18.422,0-34.419,10.377-42.466,25.605C14,48.291,12,55.912,12,64c0,7.882,1.9,15.32,5.267,21.882 C25.223,101.389,41.372,112,60,112c12.382,0,23.668-4.688,32.182-12.386C101.896,90.831,108,78.128,108,64 C108,60.922,107.699,57.917,107.145,55z"
                  opacity=".35"
                ></path>
                <path
                  fill="#44bf00"
                  d="M17.267,81.882C25.223,97.389,41.372,108,60,108c12.382,0,23.668-4.688,32.182-12.386L77.506,83.118 C72.642,86.809,66.577,89,60,89c-12.574,0-23.278-8.002-27.299-19.191L17.267,81.882z"
                ></path>
                <path
                  d="M77.506,83.118c-0.684,0.553-1.685,1.158-2.398,1.638l14.711,12.846 c0.807-0.641,1.6-1.298,2.363-1.988L77.506,83.118z"
                  opacity=".35"
                ></path>
                <path
                  fill="#0075ff"
                  d="M92.182,95.614C101.896,86.83,108,74.128,108,60c0-3.078-0.301-6.083-0.855-9H100H87.569H60v18 h27.569c-1.852,5.677-5.408,10.585-10.063,14.118L92.182,95.614z"
                ></path>
                <path
                  d="M32.701,69.809L17.267,81.882c0.486,0.948,1.004,1.877,1.551,2.787l15.3-11.576 C33.63,72.181,33.05,70.804,32.701,69.809z"
                  opacity=".35"
                ></path>
                <path
                  fill="#ffc400"
                  d="M17.267,81.882C13.9,75.32,12,67.882,12,60c0-8.088,2-15.709,5.534-22.395l15.568,11.537 C31.746,52.496,31,56.161,31,60c0,3.443,0.6,6.745,1.701,9.809L17.267,81.882z"
                ></path>
                <path
                  d="M17.534,37.605c-0.482,0.844-1.169,2.36-1.564,3.251l16.059,11.491 c0.299-1.095,0.653-2.167,1.072-3.205L17.534,37.605z"
                  opacity=".35"
                ></path>
                <path
                  fill="#ff1200"
                  d="M33.101,49.142C37.399,38.505,47.823,31,60,31c7.365,0,14.083,2.75,19.198,7.273l13.699-13.21 C84.305,16.969,72.736,12,60,12c-18.422,0-34.419,10.377-42.466,25.605L33.101,49.142z"
                ></path>
              </svg>
              <span className={styles.TextIcon2}>Google</span>
            </button>
            <br />
            <button className={styles.customButton}>
              <svg
                className={styles.svg3}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 256 256"
              >
                <g
                  fill="#4263e4"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ mixBlendMode: "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M 5,4 c -0.553,0 -1,0.447 -1,1 v 19 h 20 v -20 z M 26,4 v 20 h 20 v -19 c 0,-0.553 -0.448,-1 -1,-1 z M 4,26 v 19 c 0,0.553 0.448,1 1,1 h 19 v -20 z M 26,26 v 20 h 19 c 0.552,0 1,-0.447 1,-1 v -19 z"></path>
                  </g>
                </g>
              </svg>
              <span className={styles.TextIcon3}>Microsoft</span>
            </button>
            <p className={styles.Off}>OU</p>
          </div>
          <div className={styles.container}>
            <form className={styles.Registre}>
              <h4>Registre-se!</h4>
              <div className={styles.formGroup1}>
                <label
                  htmlFor="nome1"
                  className={`${styles.label} ${focusedInput === 'nome1' ? styles.focused : ''}`}
                >
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  id="nome1"
                  name="nome1"
                  placeholder="Digite seu nome de usuário"
                  onFocus={() => handleInputFocus('nome1')}
                  onBlur={handleInputBlur}
                />
              </div>
              <div className={styles.formGroup}>
                <label
                  htmlFor="nome2"
                  className={`${styles.label} ${focusedInput === 'nome2' ? styles.focused : ''}`}
                >
                  Senha
                </label>
                <input
                  type="text"
                  id="nome2"
                  name="nome2"
                  placeholder="Digite uma senha"
                  onFocus={() => handleInputFocus('nome2')}
                  onBlur={handleInputBlur}
                />
              </div>
              <div className={styles.formGroup}>
                <label
                  htmlFor="nome3"
                  className={`${styles.label} ${focusedInput === 'nome3' ? styles.focused : ''}`}
                >
                  Digite uma Cidade de Preferência
                </label>
                <input
                  type="text"
                  id="nome3"
                  name="nome3"
                  placeholder="Digite uma cidade"
                  onFocus={() => handleInputFocus('nome3')}
                  onBlur={handleInputBlur}
                />
              </div>
              <div className={styles.Caixa}>
                <label className={styles.CheckBoxContainer}>
                  <input
                    type="checkbox"
                    checked={receberNotificacoes}
                    onChange={handleCheckboxChange}
                  />
                  <span className={styles.TextCheckbox}>Receber notificações do clima</span>
                </label>
              </div>
              <button className={styles.Logar}>Sign up</button>
            </form>
          </div>
        </motion.div>
        <motion.div
          className={styles.Capa}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <video
            className={styles.Capa1}
            src={selectedVideo}
            autoPlay
            loop
            muted
          ></video>
        </motion.div>
      </div>
    </main>
  );
};

export default Login;
