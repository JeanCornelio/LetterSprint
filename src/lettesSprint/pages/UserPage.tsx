import { HistoricalScoreTable } from "../../components/HistoricalScoreTable";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { ScoreModeTable } from "../../components/ScoreModeTable";
import { useAuth } from "../../hooks/useAuth";
import { useResult } from "../../hooks/useResult";
import { AvatarIcon } from "../../icons/Icons";
import { useTestConfiguration } from "../../hooks/useTestConfiguration";
import { UI_LABELS } from "../../constants/uiLabels";

export const UserPage = () => {
  const { photoURL, username, displayName, stats } = useAuth();
  const { tests, setLmt } = useResult();
  const { language } = useTestConfiguration();
  const labels = UI_LABELS[language];

  return (
    <ProtectedRoute>
      <section
        id="user-profile"
        className="container flex flex-col gap-5 animate-fade-in">
        <div className="w-full p-5 rounded-md flex flex-col md:flex-row gap-4 bg-sprint-config">
          <div className="flex items-center gap-5">
            {photoURL ? (
              <img
                className="w-20 md:w-32 p-1 rounded-full ring-2 ring-sprint-ring "
                src={photoURL}
                alt={labels.utility.avatarAlt}
              />
            ) : (
              <div className="relative overflow-hidden w-28 h-28 p-1 rounded-full ring-2 ring-sprint-ring">
                <AvatarIcon className="absolute w-32 h-32 text-sprint-muted -bottom-5 -left-2" />
              </div>
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{username}</h2>
              {displayName && <h2 className="text-lg">{displayName}</h2>}
            </div>
          </div>
          <div className="border-r-4 rounded-full border-x-sprint-home hidden sm:flex"></div>
          <div className=" flex-1 flex flex-wrap  sm:items-center gap-5 md:justify-evenly ">
            <div>
              <h2 className="text-1xl">{labels.userPage.testsCompleted}</h2>
              <h2 className="text-3xl text-sprint-blue font-bold">
                {stats.testsCompleted}
              </h2>
            </div>
            <div>
              <h2 className="text-1xl">{labels.userPage.totalWords}</h2>
              <h2 className="text-3xl text-sprint-blue font-bold">
                {stats.wordsWritten}
              </h2>
            </div>
            <div>
              <h2 className="text-1xl">{labels.userPage.timeTyping}</h2>
              <h2 className="text-3xl text-sprint-blue font-bold">
                {stats.timeTyping}
              </h2>
            </div>
          </div>
        </div>
        {stats.testsCompleted > 0 && (
          <div className="grid grid-col-1  lg:grid-cols-2 gap-5">
            <ScoreModeTable
              records={stats.timeRecord}
              title={labels.userPage.timeRecords}
            />
            <ScoreModeTable
              records={stats.wordRecord}
              title={labels.userPage.wordRecords}
            />
          </div>
        )}

        {stats.testsCompleted > 0 ? (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-sprint-muted">
              {labels.userPage.historyTitle}
            </h3>
            <HistoricalScoreTable tests={tests} />
          </div>
        ) : (
          <h2 className="text-2xl text-center mt-5">
            {labels.userPage.noTestsCompleted}
          </h2>
        )}

        {stats.testsCompleted > tests.length && (
          <button
            className="p-3 rounded-md bg-sprint-config cursor-pointer hover:opacity-80 hover:bg-sprint-surface-hover/35 transition"
            onClick={() => setLmt()}>
            {labels.userPage.loadMore}
          </button>
        )}
      </section>
    </ProtectedRoute>
  );
};
