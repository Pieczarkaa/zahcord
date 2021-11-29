import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages:[],
  edit:null
};
export const fetchMessagesByChannel = createAsyncThunk(
  "/api/servers/channels/messages",
  async(channelId) =>{
      const {data}=await axios.post('/api/servers/channels/messages',{_id:channelId});
      return data;
    }
);

export const AddMessage = createAsyncThunk(
  "/api/servers/channels/messages/add",
  async(message,{getState} ) =>{
      const state = getState(); 
      const currentChannel=state.channel.currentChannel;
      const {data}=await axios.post('/api/servers/channels/messages/add',{message,channel:currentChannel});
      return data;
    }
);

export const EditMessage = createAsyncThunk(
  "/api/servers/channels/messages/edit",
  async(message) =>{
      const {data}=await axios.post('/api/servers/channels/messages/edit',{message});
      return data;
    }
);

export const DeleteMessage = createAsyncThunk(
  "/api/servers/channels/messages/delete",
  async(msgId) =>{
      const {data}=await axios.post('/api/servers/channels/messages/delete',{_id:msgId});
      return data;
    }
);

export const PinMessage = createAsyncThunk(
  "/api/servers/channels/messages/pin",
  async(msg_Id,{getState}) =>{
      const state = getState(); 
      const currentChannel=state.channel.currentChannel;
      const {data}=await axios.post('/api/servers/channels/messages/pin',{msg_Id:msg_Id,channel_Id:currentChannel._id});
      return data;
    }
);


export const chatSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    SocketIOmessageSet: (state,action) => {
      state.messages.push(action.payload);
    },
    MsgToEdit:(state,action)=>{
      state.edit=action.payload;
    },
    EditMsg:(state,action)=>{
      const index=current(state.messages).findIndex((msg)=>msg._id===action.payload._id);
      state.messages[index]=action.payload;
      console.log(state.messages[index]);
    },
    DeleteMsg:(state,action)=>{
      state.messages=current(state.messages).filter((msg)=>msg._id!==action.payload._id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByChannel.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(fetchMessagesByChannel.fulfilled, (state, action) => {
        state.messages=action.payload;
      })      
  },
});
export const { SocketIOmessageSet,MsgToEdit,EditMsg,DeleteMsg } = chatSlice.actions;
export default chatSlice.reducer;