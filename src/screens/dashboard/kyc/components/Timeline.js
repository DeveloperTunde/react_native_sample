 import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image
 } from 'react-native';
 import Timeline from 'react-native-timeline-flatlist'
 import style from '../../style';
 
 export default class MyTimeline extends Component {
   constructor(){
     super()
    
     
     this.renderDetail = this.renderDetail.bind(this)
 
     this.data = [
       {
         time: '', 
         title: 'Archery Training', 
         description: 'The Beginner Archery and Beginner Crossbow cour ',
         lineColor:'#009688', 
         lineWidth: 1,
         icon: require('../../../../assets/images/marked.png'),
         imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
       },
       {
         time: '', 
         title: 'Play Badminton', 
         description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.', 
         icon: require('../../../../assets/images/unmarked.jpg'),
         imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
       },
      
       
     ]
     this.state = {selected: null}
   } 
 

 
   renderDetail(rowData, sectionID, rowID) {
     let title = <Text style={[style.title]}>{rowData.title}</Text>
     var desc = null
     if(rowData.description )
       desc = (
         <View style={style.description_container}>   
           <Text style={[style.text_description]}>{rowData.description}</Text>
         </View>
       )
     
     return (
       <View style={style.timeline_list_wrap}>
         {title}
         {desc}
       </View>
     )
   }
 
   render() {
     return (
       <View style={style.timeline_container}>
         <Timeline 
           style={styles.timeline}
           data={this.data}
           circleSize={20}
           circleColor='rgba(0,0,0,0)'
           dotColor='rgb(45,156,219)'
           
           descriptionStyle={{color:'gray'}}
           options={{
             style:{paddingTop:5}
           }}
           innerCircle={'icon'}
           
           renderDetail={this.renderDetail}
         />
       </View>
     );
   }
 }
 
