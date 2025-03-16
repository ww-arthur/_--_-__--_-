interface Confirm {
    title: string
    message: string
    onConfirm: () => void
    onCancel?: () => void
  }
  export default function () {
    return useState<Confirm | null>('confirm', () => (null))
  }