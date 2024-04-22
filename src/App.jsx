import { useState } from 'react'

import { FaRegTrashAlt, FaCheckCircle } from 'react-icons/fa'

const initialTodos = JSON.parse(localStorage.getItem('todos'))

function App() {
	const [todos, setTodos] = useState(initialTodos)
	const [formText, setFormText] = useState('')

	const addTodo = e => {
		e.preventDefault()

		const newTodos = [...todos, { text: formText, completed: false }]
		setTodos(newTodos)
		localStorage.setItem('todos', JSON.stringify(newTodos))
		setFormText('')
	}

	const handleComplete = text => {
		const newTodos = todos.map(todo => {
			if (todo.text === text) return { text, completed: true }
			return todo
		})
		setTodos(newTodos)
		localStorage.setItem('todos', JSON.stringify(newTodos))
	}

	const deleteTodo = text => {
		const newTodos = todos.filter(todo => todo.text !== text)
		setTodos(newTodos)
		localStorage.setItem('todos', JSON.stringify(newTodos))
	}
	return (
		<div className='w-[500px] flex flex-col mx-auto mt-7 border border-black rounded-sm py-4 px-10'>
			<h1 className='mb-4 font-bold text-4xl'>Todo list</h1>
			<div>
				<form onSubmit={addTodo} className='flex justify-between mb-3'>
					<input
						className='border border-black rounded-md p-2 w-3/4'
						id='todo'
						type='text'
						name='todo'
						value={formText}
						placeholder='Set a todo'
						onChange={e => {
							setFormText(e.target.value)
						}}
					/>
					<button
						type='submit'
						className='text-gray-50 bg-green-500 rounded-lg font-bold px-3'
					>
						Add todo
					</button>
				</form>
				<div className='mb-4'>
					<h3 className='text-xl font-bold'>Todos</h3>
					<ul>
						{todos.length ? (
							todos.map(({ text, completed }) => {
								if (completed === false)
									return (
										<li
											key={text}
											className='flex justify-between items-center mb-2'
										>
											<span>{text}</span>{' '}
											<span className='flex gap-2'>
												<span
													title='Mark as completed'
													className='cursor-pointer text-2xl text-green-500 hover:text-green-600'
													onClick={() => {
														handleComplete(text)
													}}
												>
													<FaCheckCircle />
												</span>
												<span
													title='Delete this todo'
													className='cursor-pointer text-2xl hover:text-red-600'
													onClick={() => {
														deleteTodo(text)
													}}
												>
													<FaRegTrashAlt />
												</span>
											</span>
										</li>
									)
							})
						) : (
							<li>No todos yet</li>
						)}
					</ul>
				</div>
				<div>
					<h3 className='text-xl font-bold'>Already done</h3>
					<ul>
						{todos.findIndex(todo => todo.completed === true) !== -1 ? (
							todos.map(({ text, completed }) => {
								if (completed)
									return (
										<li
											key={text}
											className='flex justify-between items-center mb-2'
										>
											<span className='line-through'>{text}</span>{' '}
											<span
												title='Delete this todo'
												className='cursor-pointer text-2xl hover:text-red-600'
												onClick={() => {
													deleteTodo(text)
												}}
											>
												<FaRegTrashAlt />
											</span>
										</li>
									)
							})
						) : (
							<li>Nothing done yet</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default App
