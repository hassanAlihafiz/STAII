interface Fund {
  id: number
  defaultValue: number
  title?: string
  level?: string
  value?: number
  color?: string
}

function updateFunds(
  prevFunds: Fund[],
  fundId: number,
  newValue: number
): Fund[] {
  return prevFunds.map((fund) =>
    fund.id === fundId
      ? { ...fund, defaultValue: Math.min(100, Math.max(0, newValue)) }
      : fund
  )
}

function distributeFunds(updatedFunds: Fund[]): Fund[] {
  const totalAllocatedPercentage = updatedFunds
    .filter((fund) => fund.id !== 1)
    .reduce((acc, fund) => acc + fund.defaultValue, 0)

  const remainingPercentage = 100 - updatedFunds[0].defaultValue
  const scalingFactor =
    totalAllocatedPercentage > 0
      ? remainingPercentage / totalAllocatedPercentage
      : 0

  return updatedFunds.map((fund) =>
    fund.id !== 1
      ? {
          ...fund,
          defaultValue: Math.round(
            Math.min(100, Math.max(0, fund.defaultValue * scalingFactor))
          ),
        }
      : fund
  )
}

function adjustFunds(updatedFunds: Fund[]): void {
  const maxSum = 100 - updatedFunds[0].defaultValue
  const currentSum = updatedFunds[1].defaultValue + updatedFunds[2].defaultValue

  if (currentSum !== maxSum) {
    const adjustment = maxSum - currentSum
    updatedFunds[1].defaultValue += adjustment / 2
    updatedFunds[2].defaultValue += adjustment / 2
  }
}

export function handleTripleSliderChange(
  prevFunds: Fund[],
  fundId: number,
  newValue: number
): Fund[] {
  let updatedFunds = updateFunds(prevFunds, fundId, newValue)

  if (fundId === 1) {
    updatedFunds = distributeFunds(updatedFunds)
    adjustFunds(updatedFunds)
  } else if (fundId === 2 || fundId === 3) {
    const maxSecondValue = 100 - updatedFunds[0].defaultValue
    updatedFunds[1].defaultValue = Math.min(
      maxSecondValue,
      updatedFunds[1].defaultValue
    )

    const maxThirdValue =
      100 - updatedFunds[0].defaultValue - updatedFunds[1].defaultValue
    updatedFunds[2].defaultValue = Math.min(
      maxThirdValue,
      updatedFunds[2].defaultValue
    )

    const currentSum =
      updatedFunds[1].defaultValue + updatedFunds[2].defaultValue
    const adjustment = 100 - updatedFunds[0].defaultValue - currentSum

    if (adjustment !== 0) {
      if (fundId === 2) {
        updatedFunds[2].defaultValue += adjustment
      } else {
        updatedFunds[1].defaultValue += adjustment
      }
    }
  }

  return updatedFunds
}
export function handleDoubleSlider(
  prevFunds: Fund[],
  fundId: number,
  newValue: number
): Fund[] {
  let updatedFunds = updateFunds(prevFunds, fundId, newValue)
  if (fundId === 1) {
    const change = newValue - prevFunds[0].defaultValue
    const newSecondValue = 100 - Math.min(100, Math.max(0, newValue))
    updatedFunds[1].defaultValue = Math.min(100, Math.max(0, newSecondValue))
  } else if (fundId === 2) {
    const change = newValue - prevFunds[1].defaultValue
    const newFirstValue = 100 - Math.min(100, Math.max(0, newValue))
    updatedFunds[0].defaultValue = Math.min(100, Math.max(0, newFirstValue))
  }

  return updatedFunds
}
export function handleQuadSliderChange(
  prevFunds: Fund[],
  fundId: number,
  newValue: number
): Fund[] {
  let updatedFunds = updateFunds(prevFunds, fundId, newValue)

  if (fundId === 1) {
    updatedFunds = distributeFunds(updatedFunds)
    adjustFunds(updatedFunds)
  } else if (fundId === 2 || fundId === 3 || fundId === 4) {
    const maxSecondValue = 100 - updatedFunds[0].defaultValue
    updatedFunds[1].defaultValue = Math.min(
      maxSecondValue,
      updatedFunds[1].defaultValue
    )

    const maxThirdValue =
      100 - updatedFunds[0].defaultValue - updatedFunds[1].defaultValue
    updatedFunds[2].defaultValue = Math.min(
      maxThirdValue,
      updatedFunds[2].defaultValue
    )

    const maxFourthValue =
      100 -
      updatedFunds[0].defaultValue -
      updatedFunds[1].defaultValue -
      updatedFunds[2].defaultValue
    updatedFunds[3].defaultValue = Math.min(
      maxFourthValue,
      updatedFunds[3].defaultValue
    )

    const currentSum =
      updatedFunds[1].defaultValue +
      updatedFunds[2].defaultValue +
      updatedFunds[3].defaultValue
    const adjustment = 100 - updatedFunds[0].defaultValue - currentSum

    if (adjustment !== 0) {
      if (fundId === 2) {
        updatedFunds[2].defaultValue += adjustment
      } else if (fundId === 3) {
        updatedFunds[3].defaultValue += adjustment
      } else {
        updatedFunds[1].defaultValue += adjustment
      }
    }
  }

  return updatedFunds
}
