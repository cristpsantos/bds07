import './styles.css';
import axios from 'axios';
import ResultCard from 'components/ResultCard';
import { useState } from 'react';

type FormData = {
  cep: string;
};

type Address = {
  logradouro: string;
  localidade: string;
};

const CepSearch = () => {
  const [address, setAdress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    cep: '',
  });

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`)
      .then((response) => {
        setAdress(response.data);
      })
      .catch((error) => {
        setAdress(undefined);
      })
  };

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handlerSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              value={formData.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handlerChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>
        {address && (
          <>
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Localidade" description={address.localidade} />
          </>
        )}
      </div>
    </div>
  );
};

export default CepSearch;
