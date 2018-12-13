(function(){const MAX_NUMBER = 5000;
	const RATE_CORRECT_OF_MB = 99;
	function mA(){
		return Math.floor(Math.random() *MAX_NUMBER + 1);
	}
	function mB(num, correctNumber){
		const numberThisTime = Math.floor(Math.random() * 100 + 1);
		var correctType = false;

		if(numberThisTime <=  100 - RATE_CORRECT_OF_MB){
			correctType = true;
			// Lan nay may bi sai
			//    var thisGuestCorrectly = Math.floor(Math.random() * 2 + 1) ==1; //Xem thu lan nay may chon trung hay khong;
			//  correctType = thisGuestCorrectly?  correctType: !correctType;
		}
		//correctType = correctType ;
		return {
			correctType: correctType,
			num: num
		}
	}

	function main(){
		const resultNumber = mA();
		var countGuestCorrectlyFromMBButFail = 0;
		var result = [];
		for(var i = 0;i< MAX_NUMBER;i++){
			var current = mB(i, resultNumber);
			if(current.correctType && current.num !== resultNumber){
				countGuestCorrectlyFromMBButFail++;
				console.log("So doan la dung nhung sai so dung doan",current.num);
				result.push(current);
			}
		}
		console.log("So dung la", resultNumber);
		console.log("So lan doan la trung nhung bi sai", countGuestCorrectlyFromMBButFail);
		console.log("Ti le doan dung that su", 1/(countGuestCorrectlyFromMBButFail+1)*100,"%");
		return result;
	}
	main();
})();