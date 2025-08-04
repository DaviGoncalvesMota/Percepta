import { Feedback, Forum, Info, Dashboard, AccountCircle, SmartToy } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Lists = () => {
    
  const [ open ] = useState(true);
  const userId = useParams().id;

  const items = [
    { text: "Feed ", icon: <Forum />, path: "/allfeedbacks/" + userId },
    { text: "Sobre", icon: <Info />, path: "/about/" + userId },
    { text: "Envie seu Feedback", icon: <Feedback />, path: "/feedback/" + userId },
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard/" + userId },     
    { text: "Assistente de IA", icon: <SmartToy />, path: "/ia/" + userId },
    { text: "Perfil", icon: <AccountCircle />, path: "/profile/" + userId },
  ]

  return (
    <>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => window.location.href = item.path}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List> 
    </>
  );
};

export default Lists;
