import { useEffect, useState } from 'react';
import { setActualTests, setTets } from '../store/testResults/slice';
import { saveTest, saveUserStats } from '../utils/firebaseAuth.utils';
import { useAppDispatch, useAppSelector } from './useStore';
import { setCurrentStats } from '../store/auth/slice';
import { useAuth } from './useAuth';
import { Stats, Test } from '../interfaces/Test';
import { getTests } from '../utils/firebaseService';

export const useResult = () => {
  const { tests } = useAppSelector(({ results }) => results);
  const { stats, uid } = useAuth();
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(5);

  const fetchTests = async () => {
    if (!uid) return;
    const testsData = await getTests(limit, uid);
    const sortedTests = (testsData as Test[]).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    dispatch(setActualTests(sortedTests));
  };

  useEffect(() => {
    fetchTests();
  }, [limit, uid]);

  const setLmt = () => {
    setLimit(limit + 10);
  };

  const setTestsResult = (newTest: Test) => {
    dispatch(setTets(newTest));
    saveTest(newTest);
  };

  const setStats = (newStats: Stats) => {
    dispatch(setCurrentStats(newStats));
  };

  useEffect(() => {
    if (uid && stats) {
      saveUserStats(stats);
    }
  }, [stats, uid]);

  return {
    tests,
    setTestsResult,
    setStats,
    setLmt,
  };
};