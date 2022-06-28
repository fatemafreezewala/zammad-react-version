import {create} from 'apisauce'
import apiconstants from './apiconstants'

const api = create({
    baseURL: 'http://support.sos-ndd.com' + "/api/v1/"
  })
  if(apiconstants.role == 'CLIENT'){
    api.setHeaders({
      Authorization: 'Token token='+apiconstants.client_token
    })
  }
  
  export default api