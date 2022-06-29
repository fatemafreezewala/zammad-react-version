import { Alert, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import RNPickerSelect , { defaultStyles }from 'react-native-picker-select';
import api from '../../constants/api'
import Button from '../../components/Button'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ChangeBookingStatus = ({route,navigation}) => {
  const {id,status_p,priority_p} = route.params;
  const [status, setStatus] = useState('')
  const [priority_id, setpriority_id] = useState('')
  const [loading, setLoading] = useState(false)
  React.useEffect(() => {
    console.log(priority_id)
  
    return () => {
      console.log(priority_id)
    }
  }, [])
  
  const updateTicket = () =>{
    console.log(priority_id)
    if(status != '' && priority_id != ''){
      setLoading(true)
      api.put("tickets/"+id,{
        "id": id,
        "state_id": status,
        "priority": priority_id
     }).then(res=>{

      if(res.data.id){
        Alert.alert(`Ticket Number ${id} Updated successfully.`)
        navigation.goBack()
       }else{
       
        Alert.alert('Error Updating tickets.')
       }
      }).finally(()=>{
        setLoading(false)
      })
    }else{
      Alert.alert('Status and priority are required.')
    }
  
  }
  return (
    <View style={{flex:1,padding:20}}>
       <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:5}}>
      <AntDesign size={30} color="#000" name="arrowleft"></AntDesign>
      </TouchableOpacity>
      <Text style={{fontSize:20,color:'#000'}}>Status</Text>
      <RNPickerSelect 
         style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 20,
            right: 10,
          },
          placeholder: {
            color: 'black',
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      useNativeAndroidPickerStyle={false}
      onValueChange={(value) => setStatus(value)}
        value={status_p.toString()}
            items={[
                { label: 'Open', value: '2' },
                { label: 'Closed', value: '4' },
                { label: 'Pending Close', value: '7' },
                { label: 'Pending Reminder', value: '3' }
            ]}
      >

      </RNPickerSelect>
      <Text style={{fontSize:20,color:'#000',marginTop:30}}>Priority</Text>
      <RNPickerSelect 
      style={{
        ...pickerSelectStyles,
        iconContainer: {
          top: 20,
          right: 10,
        },
        placeholder: {
          color: 'black',
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
      useNativeAndroidPickerStyle={false}
      onValueChange={(value) => setpriority_id(value)}
      
        value={priority_id == ''? '1' : priority_id}
            items={[
                { label: 'Low', value: '1' },
                { label: 'High', value: '2' },
                { label: 'Medium', value: '3' },
              
            ]}
      >

      </RNPickerSelect>
      <Button style={{marginTop:30}} mode="contained" loading={loading} onPress={()=>{
        updateTicket()
      }}>Update</Button>
    </View>
  )
}

export default ChangeBookingStatus

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});