<template>
	<div style="width:35%; float:left">
		<mu-tabs :value="activeTab" @change="handleTabChange">
			<mu-tab value="tab1" icon="contacts" />
			<mu-tab value="tab2" icon="group" />
			<mu-tab value="tab3" icon="search" />
		</mu-tabs>
		<div v-if="activeTab === 'tab1'">
			<mu-list style="max-height:650px; overflow:auto;">

				<mu-list-item v-for="item in friends" :title="item.username" @click="showUserTitie(item)">
					<div class="mu-avatar" style="width: 30px; height: 30px;" slot="leftAvatar">
						<div class="mu-avatar-inner">
							<!--<i class="mu-icon material-icons" >contacts</i>-->
							<!---->
							<mu-icon v-if="onlineUser[item.username]!=undefined" value="star" color="#1976d2" slot="left" />
							<mu-icon v-else value="star" slot="left" />
						</div>
					</div>
					<mu-icon value="delete" slot="after" @click="deleteFriend(item)"/>
					<mu-icon v-if="unreadUser.indexOf(item.username) >= 0" value="chat_bubble" color="pinkA200" slot="right" />
					<mu-icon v-else value="chat_bubble" slot="right" />
				</mu-list-item>

			</mu-list>
		</div>
		<div v-if="activeTab === 'tab2'">
			<mu-list>
				<mu-text-field v-model="c_roomName" icon="add" hintText=" 聊天室名称" class="demo-divider-form"  />
				<br/>
				<mu-raised-button label="创建聊天室" class="demo-raised-button" @click="createRoom" />

				<mu-list-item v-for="item in rooms" :title="item.roomName" @click="showRoomTitie(item)">

					<div class="mu-avatar" style="width: 30px; height: 30px;" slot="leftAvatar">
						<div class="mu-avatar-inner">
							<i class="mu-icon material-icons">group</i>

							

						</div>
					</div>
					<mu-icon value="delete" slot="after" @click="deleteRoom(item._id)"/>
					<mu-icon v-if="unreadRoom.indexOf(item.roomName) >= 0" value="chat_bubble" color="pinkA200" slot="right" />
					<mu-icon v-else value="chat_bubble" slot="right" />

				</mu-list-item>

			</mu-list>
		</div>
		<div v-if="activeTab === 'tab3'">
			<mu-list>
				<mu-text-field v-model="searchInput" icon="search" hintText="搜索联系人或群聊" />
				<br/>
				<mu-raised-button label="联系人" class="demo-raised-button" primary @click="searchFriends" />
				<mu-raised-button label="聊天室" class="demo-raised-button" secondary @click="searchRooms" />
				<mu-list-item v-if="s_rooms !== '' " :title="s_rooms.roomName">
					<div class="mu-avatar" style="width: 30px; height: 30px;" slot="leftAvatar">
						<div class="mu-avatar-inner">
							<i class="mu-icon material-icons">group</i>
						</div>
					</div>
					<mu-icon-button icon="add" slot="right" @click="addRoom(s_rooms._id)" />
				</mu-list-item>
				<mu-list-item v-if="s_friends !== '' " :title="s_friends.username">
					
					<div class="mu-avatar" style="width: 30px; height: 30px;" slot="leftAvatar">
						<div class="mu-avatar-inner">
							<!--<i class="mu-icon material-icons" >contacts</i>-->
							<!---->
							<mu-icon v-if="onlineUser[s_friends.username]!=undefined" value="star" color="#1976d2" slot="left" />
							<mu-icon v-else value="star" slot="left" />
						</div>
					</div>
					

					<mu-icon-button icon="add" slot="right" @click="addFriend(s_friends._id)" />
				</mu-list-item>
			</mu-list>
		</div>
		<toast ref="tips"></toast>
	</div>
</template>

<script>

export default {
	name: 'tags',
	data() {
		return {
			uid: '',
			friends: [],
			rooms: [],
			searchInput: '',
			s_friends: '',
			s_rooms: '',
			c_roomName: '',
			activeTab: 'tab1',
		}
	},
	computed: {
		unreadUser: function () {
			return this.$parent.unreadUser;
		},
		onlineUser: function () {
			return this.$parent.onlineUser;
		},
		unreadRoom:function(){
			return this.$parent.unreadRoom;
		}
	},
	methods: {
		refShowToast(message) {
			// console.log(this.$refs.tips);
			this.$refs.tips.showToast(message);
		},
		handleTabChange(val) {
			this.activeTab = val
		},
		searchFriends() {
			var that = this;
			this.$http.post('/api/searchUser', {
				username: that.searchInput,
			}).then(function (response) {
				console.log(response.data.result)
				if (response.data.result == "FAIL") {
					that.refShowToast("user not exist")
				} else if (response.data.result == "SUCCESS") {
					that.s_friends = response.data.data;
				}
			})
				.catch(function (err) {
					console.log(err);
				});
		},
		searchRooms() {
			var that = this;
			this.$http.post('/api/searchRoom', {
				roomName: that.searchInput,
			}).then(function (response) {
				console.log(response.data.result)
				if (response.data.result == "FAIL") {
					that.refShowToast("room not exist")
				} else if (response.data.result == "SUCCESS") {
					that.s_rooms = response.data.room;
				}
			})
				.catch(function (err) {
					console.log(err);
				});
		},
		showUserTitie(item) {
			var that = this;
			this.$parent.sendToRoom = false;
			console.log(item.username)
			this.$parent.msg = [];
			this.$parent.title = item.username;
			var unread = this.$parent.unreadMsg;
			var arr = [];
			for (var i = 0; i < unread.length; i++) {
				if (unread[i].from == item.username) {
					arr.push(unread[i]);
					unread[i] = {};
				}
			};
			this.$parent.msg = arr;
			console.log(that.$parent.unreadUser)
			if (this.unreadUser.indexOf(item.username) >= 0) {

				var num = this.unreadUser.indexOf(item.username);
				that.$parent.unreadUser.splice(num, 1);
				console.log(that.$parent.unreadUser)

			}



		},
		showRoomTitie(item) {
			var that = this;
			this.$parent.sendToRoom = true;
			console.log(item.roomName)
			this.$parent.msg = [];
			this.$parent.title = item.roomName;
			var unread = this.$parent.unreadRoomMsg;
			// console.log(unread)
			var arr = [];
			for (var i = 0;i<unread.length;i++){
				if(unread[i].from == item.roomName){
					arr.push(unread[i]);
					unread[i]={};
				}
			}
			this.$parent.msg = arr;
			console.log(arr)
			console.log(that.$parent.unreadRoom)
			if (this.unreadRoom.indexOf(item.roomName) >= 0){
				var num = this.unreadRoom.indexOf(item.roomName);
				that.$parent.unreadRoom.splice(num,1);
				console.log(that.$parent.unreadRoom)
			}
		},
		addFriend(id) {
			console.log(id)
			var that = this;
			this.$http.post('/api/addFriend', {
				uid: that.uid,
				fid: id
			}).then(function (response) {
				var res = response;
				console.log(res);
				if (res.data.result == "FAIL") {
					that.refShowToast(res.data.msg);
				} else if (res.data.result == "SUCCESS") {
					that.$parent.$socket.emit('addFriend',that.s_friends.username);
					that.refShowToast("success");
					that.$http.post('/api/getUser', {
						uid: that.uid
					}).then(function (response) {
						that.friends = response.data.friends;
						console.log(response.data)
					});

				}
			});
			
		},
		deleteFriend(item){
			console.log(item._id);
			var that = this;
			this.$http.post('/api/dropFriend', {
				uid: that.uid,
				fid: item._id
			}).then(function (response){
				var res = response;
				console.log(res.data);
				if(res.result == "FAIL"){
					that.refShowToast(res.data.msg);
				}else if(res.data.result == "SUCCESS"){
					if(that.$parent.title == item.username){that.$parent.title="选个朋友开始聊天吧~~"}
					that.$parent.$socket.emit('deleteFriend',item.username);
					that.refShowToast("delete success");
					that.$http.post('/api/getUser',{
						uid:that.uid
					}).then(function(response){
						that.friends = response.data.friends;
						
					})
				}
			})
		},
		addRoom(id) {
			console.log(id)
			var that = this;
			this.$http.post('/api/inRoom', {
				uid: that.uid,
				rid: id
			}).then(function (response) {
				var res = response;
				console.log(res);
				if (res.data.result == "FAIL") {
					that.refShowToast(res.data.msg);
				} else if (res.data.result == "SUCCESS") {
					that.refShowToast("success");
					that.$http.post('/api/getUser', {
						uid: that.uid
					}).then(function (response) {
						that.rooms = response.data.rooms;
						console.log(response.data)
					})
				}
			})
		},
		deleteRoom(id){
			var that = this;
			this.$http.post('/api/outRoom',{
				uid:that.uid,
				rid:id
			}).then(function (response){
				if(response.data.result == "SUCCESS"){
					that.$parent.title="选个朋友开始聊天吧~~";
					that.refShowToast("delete success");
					that.$http.post('/api/getUser', {
						uid: that.uid
					}).then(function (response) {
						that.rooms = response.data.rooms;
						console.log(response.data)
					})
				}
				
			})
		},
		createRoom() {
			var that = this;
			this.$http.post('/api/createRoom', {
				uid: that.uid,
				roomName: that.c_roomName
			}).then(function (response) {
				console.log(response)
				var res = response;
				if (res.data.result == "FAIL") {
					that.refShowToast(res.data.msg);
				} else if (res.data.result == "SUCCESS") {
					that.refShowToast("success");
					that.$http.post('/api/getUser', {
						uid: that.uid
					}).then(function (response) {
						that.rooms = response.data.rooms;
						console.log(response.data)
					})
				}
			})
		}
	},

	components: {

	}
}
</script>