import clsx from 'clsx'
import { type NextPage } from 'next'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const operatorMap = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => a / b,
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
      const func = operatorMap[operator as keyof typeof operatorMap]
      if (previousButton === '=') {
        setDisplay(String(func(Number(display), operand)))
      } else {
        setDisplay(String(func(operand, Number(display))))
        setOperand(Number(display))
      }
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
    <main className="mx-auto mt-8 grid w-80 grid-cols-4 gap-[1px] overflow-hidden rounded-md border border-gray-800 bg-gray-800">
      <h1 className="col-span-4 bg-gray-900 py-4 px-2 text-right text-2xl text-white">{display}</h1>
      <Button className="bg-gray-800 active:bg-gray-600" value={display === '0' ? 'AC' : 'C'} onPress={handlePress} />
      <Button className="bg-gray-800 active:bg-gray-600" value="+/-" onPress={handlePress} />
      <Button
        className={clsx('bg-amber-500', previousButton === '/' && 'bg-white text-amber-500')}
        value="/"
        onPress={handlePress}
      />
      <Button
        className={clsx('bg-amber-500', previousButton === '*' && 'bg-white text-amber-500')}
        value="*"
        onPress={handlePress}
      />
      <Button className="bg-gray-500" value="7" onPress={handlePress} />
      <Button className="bg-gray-500" value="8" onPress={handlePress} />
      <Button className="bg-gray-500" value="9" onPress={handlePress} />
      <Button
        className={clsx('bg-amber-500', previousButton === '-' && 'bg-white text-amber-500')}
        value="-"
        onPress={handlePress}
      />
      <Button className="bg-gray-500" value="4" onPress={handlePress} />
      <Button className="bg-gray-500" value="5" onPress={handlePress} />
      <Button className="bg-gray-500" value="6" onPress={handlePress} />
      <Button
        className={clsx('bg-amber-500', previousButton === '+' && 'bg-white text-amber-500')}
        value="+"
        onPress={handlePress}
      />
      <Button className="bg-gray-500" value="1" onPress={handlePress} />
      <Button className="bg-gray-500" value="2" onPress={handlePress} />
      <Button className="bg-gray-500" value="3" onPress={handlePress} />
      <Button className="row-span-2 bg-amber-500" value="=" onPress={handlePress} />
      <Button className="col-span-2 bg-gray-500" value="0" onPress={handlePress} />
      <Button className="bg-gray-500" value="." onPress={handlePress} />
    </main>
  )
}

export default Home

const buttonLabelMap: Record<string, string> = {
  '+': '+',
  '-': '-',
  '*': '??',
  '/': '??',
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
      className={twMerge(
        clsx('hover:pointer flex-1 items-center justify-center p-4 text-xl text-white active:opacity-70', className)
      )}
      onClick={() => onPress?.(value)}
    >
      {buttonLabelMap[value] ?? value}
    </button>
  )
}
