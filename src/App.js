import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { Dimensions, StatusBar } from 'react-native';
import Input from './components/Input';
import { images } from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

// ScrollView : 항목이 많을 때 스크롤 사용가능
const List = styled.ScrollView`
  flex: 1;
  width: ${({width}) => width - 40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width; // 다양한 크기의 화면에서 양쪽에 동일한 공백 유지

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});

  // 데이터 저장하기
  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  // 추가 기능
  const _addTask = () => {
    const ID = Date.now().toString(); // 항목이 추가되는 시간의 타임스탬프 이용
    const newTaskObject = {
      [ID] : {id: ID, text: newTask, completed: false},
    };
    setNewTask(''); // 값을 빈 문자열로 지정 : Input 컴포넌트 초기화
    _saveTasks({...tasks, ...newTaskObject});
  };

  // 삭제 기능
  const _deleteTask = id =>  {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };

  // 완료 기능 : 함수가 호출될 때마다 완료 여부를 나타내는 completed 값이 전환
  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTasks(currentTasks);
  };

  // 수정 기능
  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };

  // 입력 취소
  const _onBlur = () => {
    setNewTask('');
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content" // 상태바 내용 흰색으로
          backgroundColor={theme.background} // 안드로이드만 해당
        />
        <Title>TODO List</Title>
        <Input
          placeholder="+ 할 일 추가"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse() // 최신 항목이 가장 앞에 보이도록 역순으로 렌더링
            .map(item => (
              <Task
                key={item.id} // 각 항목마다 부여한 고유id를 key로 지정
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
};