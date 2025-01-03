import { useState } from 'react';
import InputMask from 'react-input-mask';
import ReCAPTCHA from 'react-google-recaptcha';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    cep: '',
    service: '',
    workRegime: '',
    hasVehicle: '',
    cpf: '',
    cnpj: '',
    submissionDate: '',
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setSlideDirection('next');
    setCurrentSection(prev => prev + 1);
  };

  const handleBack = () => {
    setSlideDirection('back');
    setCurrentSection(prev => prev - 1);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const validateFormSection = () => {
    const { fullName, phone, email, cep } = formData;
    if (currentSection === 0 && (!fullName || !phone || !email || !cep)) {
      alert('Por favor, preencha todos os campos da seção atual.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert('Por favor, complete o reCAPTCHA.');
      return;
    }

    const { fullName, phone, email, cep, service, workRegime, hasVehicle, cpf, cnpj } = formData;

    if (!fullName || !phone || !email || !cep || !service || !workRegime || !hasVehicle) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!cpf && !cnpj) {
      alert('Preencha CPF ou CNPJ.');
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        submissionDate: new Date().toISOString(),
        recaptchaToken: recaptchaValue
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Formulário enviado com sucesso!');
        setFormData({
          fullName: '', phone: '', email: '', cep: '',
          service: '', workRegime: '', hasVehicle: '',
          cpf: '', cnpj: '', submissionDate: ''
        });
        setCurrentSection(0);
      } else {
        alert('Erro ao enviar o formulário.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar o formulário.');
    }
  };

  return (
    <form className={`form ${slideDirection}`} onSubmit={handleSubmit}>
      <header className="headerform" />

      {currentSection === 0 && (
        <div className="section">
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
              {(inputProps) => <input {...inputProps} type="tel" />}
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
              {(inputProps) => <input {...inputProps} type="text" />}
            </InputMask>
          </div>
        </div>
      )}

      {currentSection === 1 && (
        <div className="section">
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
        <div className="section">
          <h2>Dados Adicionais</h2>
          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <InputMask
              mask="999.999.999-99"
              value={formData.cpf}
              onChange={handleChange}
              name="cpf"
              id="cpf"
            >
              {(inputProps) => <input {...inputProps} type="text" />}
            </InputMask>
          </div>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ:</label>
            <InputMask
              mask="99.999.999/9999-99"
              value={formData.cnpj}
              onChange={handleChange}
              name="cnpj"
              id="cnpj"
            >
              {(inputProps) => <input {...inputProps} type="text" />}
            </InputMask>
          </div>
          {/*
          <div className="form-group recaptcha-container">
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={handleRecaptchaChange}
            />
          </div>
          */}
        </div>
      )}

      <div className="button-group">
        {currentSection > 0 && (
          <button type="button" onClick={handleBack}>
            Voltar
          </button>
        )}
        {currentSection < 2 && (
          <button type="button" onClick={() => validateFormSection() && handleNext()}>
            Próximo
          </button>
        )}
        {currentSection === 2 && <button type="submit">Enviar</button>}
      </div>
    </form>
  );
}

export default Form;