import TrialPanel from './TrialPanel';

export const route = { path: '/verdict', layout: 'public', access: 'public' };

export default function VerdictScreen() {
  return <TrialPanel/>;
}
