//La I no es obligatoria pero te ayuda a saber que es una interfaz
export interface IQuestion {
    text: string;
    correctAnswerIndex: number;
    answerOptions: string[];//significa que es un array de strings

}