import styles from "./MessageIcon.module.scss";

interface MessageIconProps {
  iconPath: string;
  bgColor: string;
}

const MessageIcon = ({ iconPath, bgColor }: MessageIconProps) => {
  return (
    <div className={styles.container} style={{backgroundColor: `${bgColor}`}}>
      <img className={styles.icon} src={iconPath} alt="Message icon" width={16} height={16}/>
    </div>
  );
};

export default MessageIcon;
