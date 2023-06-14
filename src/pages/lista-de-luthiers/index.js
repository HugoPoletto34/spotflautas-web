import React, {useEffect, useState} from "react";
import { LuthierListWrapper, LuthierItem } from "./styles";
import luthiersMock from "../../mock/luthiers";

const Listaluthiers = () => {
  const [luthiers, setLuthiers] = useState([]);


  // const fetchDatas = async () => {
    // const response = await api.get("/luthiers");
    // setLuthiers(response.data);
  // };

  useEffect(() => {
    setLuthiers(luthiersMock);

  }, []);

  return (
    <LuthierListWrapper>
      {luthiers.map((luthier, index) => (
        <LuthierItem key={index}>
          <div>
            <h3>{luthier.nome}</h3>
            <p>Especialidade: {luthier.especialidade}</p>
          </div>
          <b>{luthier.telefone}</b>
        </LuthierItem>
      ))}
    </LuthierListWrapper>
  );
};

export default Listaluthiers;
