export const useSupabaseLoader = () => {
  const pending = useState<number>('pendingRequests')

  const run = async <T>(fn: () => PromiseLike<T>): Promise<T> => {
    try {
      pending.value++
      return await fn()
    } finally {
      pending.value = Math.max(0, pending.value - 1)
    }
  }

  return { run }
}