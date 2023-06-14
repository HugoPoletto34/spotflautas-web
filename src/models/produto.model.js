import PropTypes from 'prop-types';

const ProdutoModel = {
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
};

export default ProdutoModel;


