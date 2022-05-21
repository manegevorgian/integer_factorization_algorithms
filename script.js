$(window).on("load", function (e) {
    let number; //1403
    $("#simpleBtn").on("click", function(){
        number = $("#simple").val();
        $("#simpleAns").append(simple(number));
    })

    $("#fermatBtn").on("click", function(){
        number = $("#fermat").val();
        $("#fermatAns").append(fermat(number));
    })

    $("#p1Btn").on("click", function(){
        number = $("#p1").val();
        pollard_p_minus_1(number);
        let num = number
        let ans = []
        while (true) {
            let d = pollard_p_minus_1(number)
            ans.push(d)
            let r = Math.floor(num / d)
            if (isPrime(r)) {
                ans.push(r)
                break
            } else
                num = r;
        }
        $("#p1Ans").append("[" + ans.toString() + "]");
    })

    $("#proBtn").on("click", function(){
        number = $("#pro").val();
        let p = PollardRho(number);
        $("#proAns").append("[" + [p, number/p].toString() + "]");
    })

    $("#qsBtn").on("click", function(){
        number = $("#qs").val();
        // quadratic(number);
        $("#qsAns").append(quadratic(number));
    })
})

//Simple
let simple = function(n) {
    for(let i = 2; i < n; i++){
        if(n % i === 0){
            if(isPrime(i) && isPrime(n/i)) {
                return  "[" + i + ", " + n/i + "]"
            }
        }
    }
}

//Fermat
let fermat = function (n) {
    if(n <= 0) return "["+ n + "]";

    if((n & 1) === 0) return "[" + (n / 2.0) + "," + (2) + "]";

    let a = Math.ceil(Math.sqrt(n)) ;

    if(a * a === n) return "[" + a + "," + a + "]";

    let b;
    while(true)
    {
        let b1 = a * a - n ;
        b = parseInt(Math.sqrt(b1), 10);

        if(b * b === b1) break;
        else a += 1;
    }
    return "[" + (a - b) +", " + (a + b) + "]";
}
//Quadratic Sieve QS
let quadratic =  function(n){
    n = parseInt(n);
    for(let i = 2; i < n ; i++){
        let a = Math.sqrt(n + i)
        let b = Math.sqrt(i)// 19 361
            if(Number.isInteger(a) && Number.isInteger(b) ){
                if(isPrime(a-b)  &&  isPrime(a+b)){
                    return "[" + (a - b) +", " + (a + b)  + "]";
                }
            }
    }
    return "NOT FOUND";
}
function isPowerOfTwo(n)
{
    if (n == 0)
        return false;

    return parseInt( (Math.ceil((Math.log(n) / Math.log(2))))) == parseInt( (Math.floor(((Math.log(n) / Math.log(2))))));
}
//Poland's p-1
let isPrime = function (num) {

    if (num === 2) {
        return true;
    } else if (num > 1) {
        for (let i = 2; i < num; i++) {
            if (num % i !== 0) {
                return true;
            } else if (num === i * i) {
                return false
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}


let pollard_p_minus_1 = function (n) {
    let a = 2;
    let i = 2;
    while (true) {
        a = (a ** i) % n
        let d = __gcd((a - 1), n)
        if (d > 1) {
            return d;
        }
        i += 1
    }
}


// Pollard's Rho algorithm

/* Function to calculate (base^exponent)%modulus */
function modular_pow(base,exponent,modulus)
{
    /* initialize result */
    let result = 1;

    while (exponent > 0)
    {
        /* if y is odd, multiply base with result */
        if (exponent % 2 === 1)
            result = (result * base) % modulus;

        /* exponent = exponent/2 */
        exponent = exponent >> 1;

        /* base = base * base */
        base = (base * base) % modulus;
    }
    return result;
}

/* method to return prime divisor for n */
function PollardRho(n)
{
    /* no prime divisor for 1 */
    if (n === 1) return n;
    /* even number means one of the divisors is 2 */
    if (n % 2 === 0) return 2;
    /* we will pick from the range [2, N) */
    let x=(Math.floor(Math.random() * (-n + 1) ));
    let y = x;
    let c= (Math.floor(Math.random() * (-n + 1)));
    let d = 1;
    /* until the prime factor isn't obtained.
    If n is prime, return n */
    while (d === 1) {
        /* Tortoise Move: x(i+1) = f(x(i)) */
        x = (modular_pow(x, 2, n) + c + n) % n;
        /* Hare Move: y(i+1) = f(f(y(i))) */
        y = (modular_pow(y, 2, n) + c + n) % n;
        y = (modular_pow(y, 2, n) + c + n) % n;
        /* check gcd of |x-y| and n */
        d = __gcd(Math.abs(x - y), n);
        /* retry if the algorithm fails to find prime factor
        * with chosen x and c */
        if (d === n) return PollardRho(n);
    }
    return d;
}

// Recursive function to return gcd of a and b
function __gcd(a,b)
{
    return b === 0? a:__gcd(b, a % b);
}




