import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Difficulty = 'easy' | 'medium' | 'hard';

const questionsData: Record<Difficulty, { question: string; options: string[]; answer: string }[]> = {
  easy: [
    { question: 'Quanto é 1 + 1?', options: ['1', '2', '3'], answer: '2' },
    { question: 'Qual é a cor do céu?', options: ['Verde', 'Azul', 'Vermelho'], answer: 'Azul' },
  ],
  medium: [
    { question: 'Quanto é 5 * 5?', options: ['10', '25', '30'], answer: '25' },
    { question: 'Qual é a capital do Brasil?', options: ['São Paulo', 'Brasília', 'Rio de Janeiro'], answer: 'Brasília' },
  ],
  hard: [
    { question: 'Qual é a raiz quadrada de 144?', options: ['10', '12', '14'], answer: '12' },
    { question: 'Quem descobriu o Brasil?', options: ['Pedro Álvares Cabral', 'Cristóvão Colombo', 'Américo Vespúcio'], answer: 'Pedro Álvares Cabral' },
  ],
};

const QuizScreen = () => {
  const { difficulty = 'easy' } = useLocalSearchParams() as { difficulty: Difficulty }; // Parâmetro com tipagem explícita
  const router = useRouter();

  const questions = questionsData[difficulty] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz finalizado! Sua pontuação: ${score + 1}/${questions.length}`);
      setCurrentQuestion(0);
      setScore(0);
      router.push('/'); // Volta para a tela inicial após o fim do quiz
    }
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 ? (
        <>
          <Text style={styles.question}>
            {`Pergunta ${currentQuestion + 1}: ${questions[currentQuestion].question}`}
          </Text>
          {questions[currentQuestion].options.map((option: string, index: number) => (
            <Button key={index} title={option} onPress={() => handleAnswer(option)} />
          ))}
        </>
      ) : (
        <Text style={styles.error}>Nenhuma pergunta encontrada para esta dificuldade.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  question: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  error: { fontSize: 18, color: 'red', textAlign: 'center' },
});

export default QuizScreen;
