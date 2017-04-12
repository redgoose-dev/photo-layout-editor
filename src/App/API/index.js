import Layout from './Layout';
import Side from './Side';


function API(root) {

	this.layout = new Layout(root);
	this.side = new Side(root);

}


export default API;