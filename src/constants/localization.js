import general_config from '../config/general_config'
import localizationM from '../config/mohammedia/localization'
import localizationO from '../config/oujda/localization'
let localization = {}
if(general_config.city == 'mohammadia'){
    localization = localizationM
}else{
    localization = localizationO
}
export default localization



