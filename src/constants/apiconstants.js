import general_config from '../config/general_config'
import apiconstantsM from '../config/mohammedia/apiconstants'
import apiconstantsO from '../config/oujda/apiconstants'
let apiconstants = {}
if(general_config.city == 'mohammadia'){
    apiconstants = apiconstantsM
}else{
    apiconstants = apiconstantsO
}
export default apiconstants
