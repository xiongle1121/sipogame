<template>
	<div class="role-content-inner hero-content optiscroll" id="roleContent">
		<div class="hero-num">
            <span>{{myHeroNum}}</span>/<span>{{heroTotNum}}</span>
        </div>
        <ul class="hero-list clearfix">
        	<li v-for="item in myHeroList">
        		<img :src="baseUrl+item.src" />
        	</li>
        </ul>
	</div>
</template>
<script>
	export default{
		data (){
			return {
				heroTotNum: 32,
				myHeroNum: 2,
				baseUrl: '../../../../static/img/',
				myHeroList:[
					{'src' : 'hero.png'},
					{'src' : 'hero.png'},
					{'src' : 'hero.png'},
					{'src' : 'hero.png'},
					{'src' : 'hero.png'},
					{'src' : 'hero.png'},
					{'src' : 'hero.png'}
				]
			}
		},
		mounted(){
			new Optiscroll(document.getElementById('roleContent'));
			if(this.myHeroList.length<32){  // 凑齐32个li
				for(let i=this.myHeroList.length;i<32;i++){
					this.myHeroList.push({'src':'no-hero.png'});
				}
				return this.myHeroList;
			}
		}
	}
</script>
<style scoped>
	.hero-content .hero-num {
		text-align: right;
		letter-spacing: 1px;
		height: 14px;
		margin:15px 20px 4px 0;
	}
	.hero-content .hero-list {
	    width: 96%;
	    margin: 0 auto; 
	}
    .hero-content .hero-list li {
		float: left;
		width: 10%;
		height: auto;
		margin: 10px 1.25%;
		overflow: hidden;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.1); 
    }
    .hero-content .hero-list li img {
        width: 100%;
        height: auto; 
    }
</style>