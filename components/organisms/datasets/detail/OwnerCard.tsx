type OwnerCardProps = {
  owner: any // TODO: Add proper type
}

export const OwnerCard = ({ owner }: OwnerCardProps) => (
  <div className="bg-white border border-gray-200/50 rounded-xl p-3
    dark:bg-white/5 dark:border-white/10 max-w-[280px]">
    <h3 className="text-sm font-medium text-gray-900 dark:text-white/90 mb-2">Dataset Owner</h3>
    <div className="flex items-center gap-2.5">
      <img
        src={owner.avatarUrl}
        alt={owner.name}
        width={36}
        height={36}
        className="rounded-full"
      />
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white/90">{owner.name}</p>
        <p className="text-xs text-gray-500 dark:text-white/50 capitalize">
          {owner.type}
        </p>
      </div>
    </div>
  </div>
)
