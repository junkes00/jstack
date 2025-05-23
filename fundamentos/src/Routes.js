import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFount";
import Post from "./Pages/Post";
import Posts from "./Pages/Posts";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts" component={Posts} />
      <Route path="/posts/:id" component={Post} />
      <Route component={NotFound} />
    </Switch>
  );
}

/*
 * <Swtich /> => Faz o RRD percorer cada rota na ordem que foram especificadas e renderizar a
 * primeira que ele encontrar que seja igual a url
 * exact expefica que a rota tem que ser igual ao path
 * A ordem importa porque no caso da rota de NotFound, ela será exibida sempre por não ter sido
 * passado nenhum path pra ela, caso seja a primeira por não ter uma rota espeficada
 */
