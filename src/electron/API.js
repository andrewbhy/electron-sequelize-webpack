import { ipcMain } from 'electron';
import ActionTypes from '../common/ActionTypes'
import { GET } from './DataAccess'


export const setupAPI = () => {


    console.log('set IPC events')

    ipcMain.on(ActionTypes.GET_SAMPLEDATA, (event, arg1, arg2, arg3) => {

        try {
            GET.SampleData().then(result => {
                event.sender.send('IPC_RESPONSE', ActionTypes.GET_SAMPLEDATA, result);
            }).catch(err => {
                event.sender.send('IPC_RESPONSE', ActionTypes.GET_SAMPLEDATA, null, err)
            })
        }
        catch (err) {
            event.sender.send('IPC_RESPONSE', ActionTypes.GET_SAMPLEDATA, null, err)
        }



    })




}