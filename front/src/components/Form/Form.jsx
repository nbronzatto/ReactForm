import { useState } from 'react';
import InputMask from 'react-input-mask';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    cep: '',
    state: '',
    city: '',
    address: '',
    service: '',
    workRegime: '',
    hasVehicle: '',
    document: ''
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      document: value,
    });
  };

  const handleNext = () => {
    setSlideDirection('next');
    setCurrentSection((prev) => prev + 1);
  };

  const handleBack = () => {
    setSlideDirection('back');
    setCurrentSection((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulário enviado!');
  };

  const getSlideAnimation = () => {
    return slideDirection === 'next' ? 'slide-left' : 'slide-right';
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <header className="headerform">
      </header>

      {currentSection === 0 && (
        <div className={`section ${getSlideAnimation()}`}>
          <h2>Dados de Contato</h2>
          <div className="form-group">
            <label htmlFor="fullName">Nome Completo:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone:</label>
            <InputMask
              mask="(99) 99999-9999"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              id="phone"
              required
            >
              {(inputProps) => <input {...inputProps} type="tel" placeholder="(xx) xxxxx-xxxx" />}
            </InputMask>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP:</label>
            <InputMask
              mask="99999-999"
              value={formData.cep}
              onChange={handleChange}
              name="cep"
              id="cep"
              required
            >
              {(inputProps) => <input {...inputProps} type="text" placeholder="xxxxx-xxx" />}
            </InputMask>
          </div>
        </div>
      )}

      {currentSection === 1 && (
        <div className={`section ${getSlideAnimation()}`}>
          <h2>Produtos e Serviços</h2>
          <div className="form-group">
            <label htmlFor="service">Qual serviço da Nova Orion te chamou a atenção?</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma opção</option>
              <option value="fgts">Saque Aniversário FGTS</option>
              <option value="consignado">Crédito Consignado</option>
              <option value="refinanciamento">Refinanciamento de Veículos</option>
              <option value="conta_pj">Conta PJ sem Tarifas</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="workRegime">Qual seu regime de trabalho?</label>
            <select
              id="workRegime"
              name="workRegime"
              value={formData.workRegime}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma opção</option>
              <option value="clt">CLT (carteira assinada)</option>
              <option value="aposentado">Aposentado/pensionista</option>
              <option value="autonomo">Autônomo</option>
              <option value="empresario">Empresário Proprietário PJ</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Você possui um veículo em seu nome?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="hasVehicle"
                  value="sim"
                  checked={formData.hasVehicle === 'sim'}
                  onChange={handleChange}
                />
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name="hasVehicle"
                  value="nao"
                  checked={formData.hasVehicle === 'nao'}
                  onChange={handleChange}
                />
                Não
              </label>
            </div>
          </div>
        </div>
      )}

      {currentSection === 2 && (
        <div className={`section ${getSlideAnimation()}`}>
          <h2>Dados Adicionais</h2>
          <div className="form-group">
            <label htmlFor="document">CPF ou CNPJ:</label>
            <InputMask
              mask={formData.document.length <= 14 ? "999.999.999-99" : "99.999.999/9999-99"}
              value={formData.document}
              onChange={handleDocumentChange}
              name="document"
              id="document"
              required
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  placeholder={formData.document.length <= 14 ? "xxx.xxx.xxx-xx" : "xx.xxx.xxx/xxxx-xx"}
                />
              )}
            </InputMask>
          </div>
        </div>
      )}

      <div className="button-group">
        {currentSection > 0 && <button type="button" onClick={handleBack}>Voltar</button>}
        {currentSection < 2 && <button type="button" onClick={handleNext}>Próximo</button>}
        {currentSection === 2 && <button type="submit">Enviar</button>}
      </div>
    </form>
  );
}

export default Form;