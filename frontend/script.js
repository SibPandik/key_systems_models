class Student {
    
    static students = []
    static maxScore = 0;
    
    constructor (name, age, avgScore) {
        this.name = name
        this.age = age
        this.avgScore = avgScore
        Student.students.push(this)
        
        if (avgScore > Student.maxScore) {
            Student.maxScore = avgScore;
        }
    }
    
    increseAge () {
        this.age ++
    }
    
    increaseAvgScore (score) {
        this.avgScore += score
        
        if (this.avgScore >= Student.maxScore) {
            Student.maxScore = this.avgScore
        }
    }
    
    showStatus () {
        if (this.avgScore >= 90) {
            return 'Отличник :D' 
        } else if (this.avgScore >= 75 && this.avgScore < 90) {
            return 'Хорошист :)'
        } else if (this.avgScore >= 60 && this.avgScore < 75) {
            return 'Троечник :/'
        } else {
            return 'Двоечник :('
        }
    }
    
    static getMaxScore() {
        return Student.maxScore;
    }
    
    static filterByScore(score) {
        return Student.students.filter(student => student.avgScore >= score);
    }
}

let Kirill = new Student('Kir', 17, 92)
let Sasha = new Student('Sanya', 18, 93)

console.log(Student.getMaxScore())
Kirill.increaseAvgScore(4)
console.log(Kirill)
console.log(Sasha)
console.log(Student.getMaxScore())
console.log(Student.filterByScore(90))