import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Keyboard 
} from 'react-native';

// Define what a Task object looks like for TypeScript
interface TaskItem {
  id: string;
  value: string;
}

export default function App() {
  // State for the text being typed (Type: string)
  const [task, setTask] = useState<string>('');
  
  // State for the array of tasks (Type: array of TaskItem objects)
  const [taskList, setTaskList] = useState<TaskItem[]>([]);

  // Function to add a task
  const handleAddTask = () => {
    if (task.trim().length > 0) {
      const newTask: TaskItem = { 
        id: Date.now().toString(), 
        value: task 
      };
      setTaskList([...taskList, newTask]);
      setTask(''); 
      Keyboard.dismiss(); 
    }
  };

  // Function to delete a task
  const deleteTask = (id: string) => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <View style={styles.inputWrapper}>
        <TextInput 
          style={styles.input} 
          placeholder={'Write a task'} 
          value={task} 
          onChangeText={(text: string) => setTask(text)} 
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={taskList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.value}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '80%',
    color: '#000',
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#55BCF6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 30,
    color: '#FFF',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    elevation: 3, // Adds a small shadow for Android
  },
  itemText: {
    maxWidth: '80%',
    color: '#333',
  },
  deleteText: {
    color: '#FF5252',
    fontWeight: 'bold',
  },
});