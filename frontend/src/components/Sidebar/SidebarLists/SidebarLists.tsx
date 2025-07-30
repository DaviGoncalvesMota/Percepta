import { Feedback, Forum, Info, Dashboard, AccountCircle, SmartToy } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";

const Lists = () => {
    
  const [ open ] = useState(true);

  const items = [
    { text: "All Feedbacks", icon: <Forum />, path: "/allfeedbacks" },
    { text: "About", icon: <Info />, path: "/about" },
    { text: "Send a Feedback", icon: <Feedback />, path: "/feedback" },
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },     
    { text: "IA", icon: <SmartToy />, path: "/ia" },
    { text: "Profile", icon: <AccountCircle />, path: "/profile" },
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
