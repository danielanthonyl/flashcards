/**
 * DEBTS:
 * - this component is design to go on every page requiring it.
 *   it would be better if it goes to the layout directly. but to do so we need a good way to determine the labels.
 */

import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

export interface suffix {
  id?: string;
  icon: string;
  onClick?: (reference: string) => void;
}

export interface HeaderProps {
  navigationPath?: string;
  navigationLabel?: string;
  title: string;
  subHeadline?: string;
  suffixes?: suffix[];
}

export const Header = ({ suffixes, title, navigationLabel, navigationPath, subHeadline }: HeaderProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(navigationPath || "");

  return (
    <div className={classes.header}>
      {navigationLabel ? <button onClick={handleGoBack}>{`< ${navigationLabel}`}</button> : null}
      <div className={classes.titles}>
        <h3>{title}</h3>
        {subHeadline ? <p>{subHeadline}</p> : null}
      </div>
      {suffixes ? (
        <div>
          {suffixes.map(({ icon, onClick, id }) => (
            <button onClick={() => onClick(id || icon)} key={id || icon}>
              <i>{icon}</i>
            </button>
          ))}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
