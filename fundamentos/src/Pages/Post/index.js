import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Post() {
  const params = useParams();
  const { search } = useLocation();
  const queryparams = useMemo(() => new URLSearchParams(search), [search]);

  console.info(queryparams.get("meuQueryParams"));

  return <h1>Post page</h1>;
}
