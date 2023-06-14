import PropTypes from 'prop-types';
import ProdutoModel from './produto.model';

const PedidoModel = {
    produtos: PropTypes.arrayOf(
        PropTypes.shape(ProdutoModel)
    ).isRequired,
    quantidade: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    usuario: PropTypes.string.isRequired,
    
};

export default PedidoModel;


