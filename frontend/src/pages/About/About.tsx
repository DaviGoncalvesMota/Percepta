import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("userId");
  const isUserRoleTrue = localStorage.getItem("userRole");
  if (!isAuthenticated || !isUserRoleTrue) {
    navigate("/login");
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <Box sx={{ maxWidth: 1000, margin: "auto", textAlign: "justify" }}>
            <Typography align="center" variant="h4" component="h1" gutterBottom>
              <strong>Sobre Nós</strong>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
              Na Percepta, acreditamos que feedback é mais do que palavras — é
              uma ponte entre as pessoas e as empresas que as atendem. Nossa
              plataforma foi construída com um objetivo em mente: criar um
              espaço simples, transparente e eficaz onde os clientes possam
              compartilhar suas experiências reais e as empresas possam ouvir,
              aprender e evoluir.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
              No mundo de hoje, a confiança é construída por meio da
              comunicação. A Percepta permite que os usuários expressem suas
              opiniões de forma respeitosa e construtiva, destacando o que as
              empresas estão fazendo bem e apontando onde podem melhorar. Seja
              sobre um ótimo atendimento, um atraso frustrante ou uma sugestão
              de melhoria, toda voz importa.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
              Para as empresas, a Percepta oferece mais do que apenas um mural
              de feedback. É uma ferramenta completa para entender a satisfação
              dos clientes, identificar tendências e agir com base em percepções
              reais. Com nossa interface intuitiva, as empresas podem acompanhar
              respostas ao longo do tempo, categorizar feedbacks por tema e
              responder diretamente ao seu público — mostrando que se importam e
              estão dispostas a evoluir.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
              Nossa visão é promover uma cultura de transparência, melhoria
              contínua e conexão humana. Não somos apenas uma plataforma de
              feedback — somos um movimento para aproximar pessoas e
              organizações por meio do diálogo aberto e da responsabilidade.
            </Typography>
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
                Junte-se a nós nessa jornada para transformar feedback em
                progresso.
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
                Percepta — Perceber, Captar, Trabalhar.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default About;
