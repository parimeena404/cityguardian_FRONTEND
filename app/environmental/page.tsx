import dynamic from 'next/dynamic'
import { ErrorBoundary } from '@/components/error-boundary'

const EnvironmentalDashboard = dynamic(
  () => import('@/components/environmental-dashboard'),
  { ssr: false }
)

export default function EnvironmentalPage() {
  return (
    <ErrorBoundary>
      <EnvironmentalDashboard />
    </ErrorBoundary>
  )
}