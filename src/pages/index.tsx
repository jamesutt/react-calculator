import clsx from 'clsx'
import { type NextPage } from 'next'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const add = (a: number, b: number) => {
  return a + b
}
const minus = (a: number, b: number) => {
  return a - b
}
const multiply = (a: number, b: number) => {
  return a * b
}
const divide = (a: number, b: number) => {
  return a / b
}

const operatorMap = {
  '+': add,
  '-': minus,
  '*': multiply,
  '/': divide,
}

const operators = Object.keys(operatorMap)
const isOperator = (value: string) => operators.includes(value)

const Home: NextPage = () => {
  const [operand, setOperand] = useState(0)
  const [operator, setOperator] = useState('')
  const [display, setDisplay] = useState('0')
  const [previousButton, setPreviousButton] = useState('')

  const handlePress = (value: string) => {
    if (value.match(/[0-9]/)) {
      if (isOperator(previousButton)) {
        setOperand(Number(display))
        setDisplay(value)
      } else if (display === '0') {
        setDisplay(value)
      } else {
        setDisplay(display + value)
      }
    } else if (isOperator(value)) {
      setOperator(value)
      setOperand(Number(display))
    } else if (value === '=') {
      if (operator === '') return
      const mappedOperator = operatorMap[operator as keyof typeof operatorMap]
      setDisplay(String(mappedOperator(operand, Number(display))))
      setOperand(Number(display))
    } else if (value === 'AC') {
      setDisplay('0')
      setOperator('')
      setOperand(0)
      setPreviousButton('')
    } else if (value === 'C') {
      if (isOperator(previousButton)) {
        setOperator('')
      } else {
        setDisplay('0')
      }
    } else if (value === '+/-') {
      setDisplay(String(Number(display) * -1))
    } else if (value === '.') {
      if (!display.includes('.')) {
        setDisplay(display + '.')
      }
    }

    setPreviousButton(value)
  }

  return (
    <>
      <div className="calculator-container mx-auto mt-8 w-64 gap-[1px] border border-gray-800 bg-gray-800">
        <h1 className="display bg-gray-900 py-4 px-2 text-right text-2xl text-white">{display}</h1>
        <Button
          className="button-clear bg-gray-800 active:bg-gray-600"
          value={display === '0' ? 'AC' : 'C'}
          onPress={handlePress}
        />
        <Button className="button-plusminus bg-gray-800 active:bg-gray-600" value="+/-" onPress={handlePress} />
        <Button className="button-divide bg-amber-500" value="/" onPress={handlePress} />
        <Button className="button-multiply bg-amber-500" value="*" onPress={handlePress} />
        <Button className="button-7 bg-gray-500" value="7" onPress={handlePress} />
        <Button className="button-8 bg-gray-500" value="8" onPress={handlePress} />
        <Button className="button-9 bg-gray-500" value="9" onPress={handlePress} />
        <Button className="button-minus bg-amber-500" value="-" onPress={handlePress} />
        <Button className="button-4 bg-gray-500" value="4" onPress={handlePress} />
        <Button className="button-5 bg-gray-500" value="5" onPress={handlePress} />
        <Button className="button-6 bg-gray-500" value="6" onPress={handlePress} />
        <Button className="button-plus bg-amber-500" value="+" onPress={handlePress} />
        <Button className="button-1 bg-gray-500" value="1" onPress={handlePress} />
        <Button className="button-2 bg-gray-500" value="2" onPress={handlePress} />
        <Button className="button-3 bg-gray-500" value="3" onPress={handlePress} />
        <Button className="button-0 bg-gray-500" value="0" onPress={handlePress} />
        <Button className="button-equal bg-amber-500" value="=" onPress={handlePress} />
        <Button className="button-decimal bg-gray-500" value="." onPress={handlePress} />
      </div>
    </>
  )
}

export default Home

const displayButtonLabel = (value: string) => {
  if (value === '+') {
    return '+'
  } else if (value === '-') {
    return '-'
  } else if (value === '*') {
    return '×'
  } else if (value === '/') {
    return '÷'
  } else {
    return value
  }
}

type ButtonProps = {
  value: string
  className?: string
  onPress?: (value: string) => void
}

const Button = (props: ButtonProps) => {
  const { className, value, onPress } = props

  return (
    <button
      className={twMerge(clsx('flex-1 items-center justify-center p-4 text-white active:opacity-70', className))}
      onClick={() => onPress?.(value)}
    >
      {displayButtonLabel(value)}
    </button>
  )
}
