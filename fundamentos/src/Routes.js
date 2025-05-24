import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { animated, useTransition } from "react-spring";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFount";
import Post from "./Pages/Post";
import Posts from "./Pages/Posts";

export default function Routes() {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: "translateY(50px)",
      position: "absolute",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0)",
      position: "absolute",
    },
    leave: {
      opacity: 0,
      transform: "translateY(50px)",
      position: "absolute",
    },
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      <Switch location={item}>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={Posts} />
        <Route path="/posts/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </animated.div>
  ));
}

/*
 * <Swtich /> => Faz o RRD percorer cada rota na ordem que foram especificadas e renderizar a
 * primeira que ele encontrar que seja igual a url
 * exact expefica que a rota tem que ser igual ao path
 * A ordem importa porque no caso da rota de NotFound, ela será exibida sempre por não ter sido
 * passado nenhum path pra ela, caso seja a primeira por não ter uma rota espeficada
 */
