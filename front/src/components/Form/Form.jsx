import { useState } from 'react';
import InputMask from 'react-input-mask';
import './Form.css';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cpf: '',
    cnpj: '',
    option: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Formulário enviado! Nome: ${formData.name}, Telefone: ${formData.phone}`);
    // Aqui você pode adicionar a lógica para enviar os dados do formulário.
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome:</label>
        <select
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o nome</option>
          <option value="João">João</option>
          <option value="Maria">Maria</option>
          <option value="Carlos">Carlos</option>
        </select>
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
        <label htmlFor="cpf">CPF:</label>
        <InputMask
          mask="999.999.999-99"
          value={formData.cpf}
          onChange={handleChange}
          name="cpf"
          id="cpf"
          required
        >
          {(inputProps) => <input {...inputProps} type="text" placeholder="xxx.xxx.xxx-xx" />}
        </InputMask>
      </div>
      <div className="form-group">
        <label htmlFor="cnpj">CNPJ:</label>
        <input
          type="text"
          id="cnpj"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          placeholder="00.000.000/0000-00"
          maxLength="18"
        />
      </div>
      <div className="form-group">
        <label htmlFor="option">Opções:</label>
        <select
          id="option"
          name="option"
          value={formData.option}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma opção</option>
          <option value="opcao1">Opção 1</option>
          <option value="opcao2">Opção 2</option>
          <option value="opcao3">Opção 3</option>
        </select>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Form;
