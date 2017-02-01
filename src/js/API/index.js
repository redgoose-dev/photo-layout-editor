import Layout from './Layout';
import Gridster from './Gridster';
import Side from './Side';


function API(root) {

	this.layout = new Layout(root);
	this.gridster = new Gridster(root);
	this.side = new Side(root);

}


export default API;