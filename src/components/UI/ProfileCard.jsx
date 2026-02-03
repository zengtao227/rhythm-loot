import { themes } from '../../themes/themeConfig';

/**
 * Profile selection cards
 */
export function ProfileCard({ themeId, selected, onClick, streak }) {
    const theme = themes[themeId];

    return (
        <div
            className={`profile-card ${theme.cssClass} ${selected ? 'selected' : ''}`}
            onClick={onClick}
            style={selected ? {
                borderColor: theme.colors.primary,
                boxShadow: `0 0 30px ${theme.colors.glow}`,
            } : {}}
        >
            {/* Theme Icon */}
            <div
                className="text-center mb-lg"
                style={{ fontSize: '4rem' }}
            >
                {theme.emoji}
            </div>

            {/* Theme Name */}
            <h2
                className="text-center mb-md"
                style={{
                    color: theme.colors.primary,
                    fontSize: '1.5rem',
                    textShadow: `0 0 20px ${theme.colors.glow}`,
                }}
            >
                {theme.name}
            </h2>

            {/* Tagline */}
            <p className="text-center text-muted" style={{ marginBottom: '1rem' }}>
                {theme.tagline}
            </p>

            {/* Streak Badge */}
            {streak > 0 && (
                <div className="flex-center">
                    <div className="streak-badge active">
                        🔥 {streak} Day Streak
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileCard;
